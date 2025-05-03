package banky.db.dao;

import banky.db.generated.QAccounts;
import banky.db.generated.QTransactions;
import banky.db.generated.QTransfert;
import banky.services.transactions.enums.TransactionSide;
import com.coreoz.plume.db.querydsl.transaction.TransactionManagerQuerydsl;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.sql.SQLQuery;
import jakarta.inject.Inject;

import java.math.BigDecimal;

/**
 * Data Access Object for account total calculations.
 * Provides reusable methods for querying transaction totals by account.
 * Must be used as a based class for other DAOs that need to calculate totals.
 */
public class TotalByAccountDao {
    protected final TransactionManagerQuerydsl transactionManager;

    @Inject
    protected TotalByAccountDao(TransactionManagerQuerydsl transactionManager) {
        this.transactionManager = transactionManager;
    }


    protected SQLQuery<BigDecimal> totalCreditTransactionsQuery(QTransactions transactions, QAccounts accounts) {
        // Add CREDIT transactions
        return transactionManager
            .selectQuery()
            .select(transactions.amount.sum().coalesce(BigDecimal.ZERO))
            .from(transactions)
            .where(
                transactions.side.eq(TransactionSide.CREDIT.name())
                    .and(transactions.accountId.eq(accounts.id))
            );
    }

    protected SQLQuery<BigDecimal> totalDebitTransactionsQuery(QTransactions transactions, QAccounts accounts) {
        // Add DEBIT transactions
        return transactionManager
            .selectQuery()
            .select(transactions.amount.sum().coalesce(BigDecimal.ZERO))
            .from(transactions)
            .where(
                transactions.side.eq(TransactionSide.DEBIT.name())
                    .and(transactions.accountId.eq(accounts.id))
            );
    }

    protected SQLQuery<BigDecimal> totalInBankCreditTransactionsQuery(QTransactions transactions, QAccounts accounts) {
        return totalCreditTransactionsQuery(transactions, accounts)
            .where(transactions.inBankDate.isNotNull());
    }

    protected SQLQuery<BigDecimal> totalInBankDebitTransactionsQuery(QTransactions transactions, QAccounts accounts) {
        return totalDebitTransactionsQuery(transactions, accounts)
            .where(transactions.inBankDate.isNotNull());
    }

    protected SQLQuery<BigDecimal> totalTransfersInQuery(QTransfert transferts, QAccounts accounts) {
        return transactionManager
            .selectQuery()
            .select(transferts.amount.sum().coalesce(BigDecimal.ZERO))
            .from(transferts)
            .where(transferts.toAccountId.eq(accounts.id));
    }

    protected SQLQuery<BigDecimal> totalTransfersOutQuery(QTransfert transferts, QAccounts accounts) {
        return transactionManager
            .selectQuery()
            .select(transferts.amount.sum().coalesce(BigDecimal.ZERO))
            .from(transferts)
            .where(transferts.fromAccountId.eq(accounts.id));
    }

    protected NumberExpression<BigDecimal> totalAccountAmountExpression(QTransactions transactions, QTransfert transferts, QAccounts accounts) {
        return accounts.initialAmount
            .add(totalCreditTransactionsQuery(transactions, accounts))
            .subtract(totalDebitTransactionsQuery(transactions, accounts))
            .add(totalTransfersInQuery(transferts, accounts))
            .subtract(totalTransfersOutQuery(transferts, accounts));
    }
}
