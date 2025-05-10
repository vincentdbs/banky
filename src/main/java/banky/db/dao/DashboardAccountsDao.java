package banky.db.dao;

import banky.db.generated.QAccounts;
import banky.db.generated.QTransactions;
import banky.db.generated.QTransfert;
import banky.services.accounts.enums.AccountType;
import banky.webservices.api.dashboard.data.DashboardCheckingAccountResponse;
import banky.webservices.api.dashboard.data.DashboardMarketAccountResponse;
import banky.webservices.api.dashboard.data.DashboardSavingAccountResponse;
import com.coreoz.plume.db.querydsl.transaction.TransactionManagerQuerydsl;
import com.querydsl.core.types.Projections;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import java.math.BigDecimal;
import java.util.List;

/**
 * Data Access Object for fetching dashboard-specific account data.
 * Handles database queries to retrieve specialized data for different account types to be displayed on the dashboard.
 */
@Singleton
public class DashboardAccountsDao extends TotalByAccountDao {

    @Inject
    private DashboardAccountsDao(TransactionManagerQuerydsl transactionManager) {
        super(transactionManager);
    }

    /**
     * Retrieves data specific to checking accounts for dashboard display.
     * Includes account details plus calculated real total amount and in-bank amount.
     *
     * @return List of checking accounts with dashboard-specific data
     */
    public List<DashboardCheckingAccountResponse> fetchAmountsByCheckingAccount() {
        QAccounts accounts = QAccounts.accounts;
        QTransactions transactions = QTransactions.transactions;
        QTransfert transferts = QTransfert.transfert;

        // Calculate total amount based on the specified formula:
        // initialAmount + sum(transactions.CREDIT) - sum(transactions.DEBIT) + sum(incoming transfers) - sum(outgoing transfers)

        return transactionManager
            .selectQuery()
            .select(
                Projections.constructor(
                    DashboardCheckingAccountResponse.class,
                    accounts.id,
                    accounts.name,
                    accounts.shortName,
                    accounts.color,
                    // Total amount calculation
                    totalAccountAmountExpression(transactions, transferts, accounts),
                    // In-bank amount
                    accounts.initialAmount
                        .add(totalInBankCreditTransactionsQuery(transactions, accounts))
                        .subtract(totalInBankDebitTransactionsQuery(transactions, accounts))
                        .add(totalTransfersInQuery(transferts, accounts))
                        .subtract(totalTransfersOutQuery(transferts, accounts))
                )
            )
            .from(accounts)
            .where(accounts.type.eq(AccountType.CHECKING.name()))
            .groupBy(accounts.id)
            .fetch();
    }

    /**
     * Retrieves data specific to savings accounts for dashboard display.
     * Includes account details plus total amount and interest amount.
     *
     * @return List of savings accounts with dashboard-specific data
     */
    public List<DashboardSavingAccountResponse> fetchAmountsBySavingAccount() {
        QAccounts accounts = QAccounts.accounts;
        QTransactions transactions = QTransactions.transactions;
        QTransfert transferts = QTransfert.transfert;

        return transactionManager
            .selectQuery()
            .select(
                Projections.constructor(
                    DashboardSavingAccountResponse.class,
                    accounts.id,
                    accounts.name,
                    accounts.shortName,
                    accounts.color,
                    // Total amount
                    totalAccountAmountExpression(transactions, transferts, accounts),
                    // Interest amount
                    transactionManager
                        .selectQuery()
                        .select(transactions.amount.sum().coalesce(BigDecimal.ZERO))
                        .from(transactions)
                        .where(transactions.accountId.eq(accounts.id)
                            // TODO change for better interest handling
                            .and(transactions.subCategoryId.eq(27L)) // Assuming 27 is the ID for interest transactions,
                        )
                )
            )
            .from(accounts)
            .where(accounts.type.eq(AccountType.SAVINGS.name()))
            .groupBy(accounts.id)
            .fetch();
    }

    /**
     * Retrieves data specific to market accounts for dashboard display.
     * Includes account details plus calculated total amount.
     *
     * @return List of market accounts with dashboard-specific data
     */
    public List<DashboardMarketAccountResponse> fetchAmountsByMarketAccount() {
        QAccounts accounts = QAccounts.accounts;
        QTransactions transactions = QTransactions.transactions;

        return transactionManager
            .selectQuery()
            .select(
                Projections.constructor(
                    DashboardMarketAccountResponse.class,
                    accounts.id,
                    accounts.name,
                    accounts.shortName,
                    accounts.color,
                    // Total amount
                    accounts.initialAmount.add(
                        transactionManager
                            .selectQuery()
                            .select(transactions.amount.sum().coalesce(BigDecimal.ZERO))
                            .from(transactions)
                            .where(transactions.accountId.eq(accounts.id))
                    )
                )
            )
            .from(accounts)
            .where(accounts.type.eq(AccountType.MARKET.name()))
            .groupBy(accounts.id)
            .fetch();
    }
}