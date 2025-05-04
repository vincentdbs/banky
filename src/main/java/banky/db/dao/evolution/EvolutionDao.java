package banky.db.dao.evolution;

import banky.db.dao.TotalByAccountDao;
import banky.db.dao.evolution.data.AccountMonthSnapshot;
import banky.db.dao.evolution.data.AccountTotalSnapshot;
import banky.db.dao.evolution.data.EvolutionResult;
import banky.db.generated.QAccounts;
import banky.db.generated.QTransactions;
import banky.db.generated.QTransfert;
import banky.guice.ApplicationModule;
import banky.webservices.api.evolution.responses.TotalByAccountAndMonthResponse;
import com.coreoz.plume.db.querydsl.transaction.TransactionManagerQuerydsl;
import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.Stage;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.sql.SQLExpressions;
import com.querydsl.sql.SQLQuery;
import com.querydsl.sql.Union;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

/**
 * Data Access Object for evolution-related database operations.
 * Provides methods to fetch data for treasury evolution reports.
 */
@Singleton
public class EvolutionDao extends TotalByAccountDao {

    @Inject
    private EvolutionDao(TransactionManagerQuerydsl transactionManager) {
        super(transactionManager);
    }

    public static void main(String[] args) {
        Injector injector = Guice.createInjector(Stage.PRODUCTION, new ApplicationModule());
        EvolutionDao evolutionDao = injector.getInstance(EvolutionDao.class);
        LocalDate startDate = LocalDate.of(2020, 1, 1);
        int numberOfMonths = 1;
        var result = evolutionDao.fetchEvolutionTotals(startDate, numberOfMonths);
    }

    /**
     * Fetches treasury evolution totals for a specified date range.
     *
     * @param firstDayOfTheMonthStartDate The first month to include in the results (day is ignored)
     * @param numberOfMonths              The number of months to fetch from the start date
     * @return A map of month dates to total calculations for each month
     */
    public Map<String, TotalByAccountAndMonthResponse> fetchEvolutionTotals(LocalDate startDate, int numberOfMonths) {
        var a = selectResult(startDate, startDate.plusMonths(numberOfMonths));
        throw new UnsupportedOperationException("Not implemented yet");
    }

    /**
     * Selects all transaction dates between the specified start and end dates from both
     * transactions and transfers tables.
     *
     * @param startDate The start date of the range (inclusive)
     * @param endDate   The end date of the range (inclusive)
     * @return A query containing dates that have transactions or transfers within the date range
     */
    private SQLQuery<LocalDate> selectAllTransactionsDateBetweenSubQuery(
        LocalDate startDate,
        LocalDate endDate
    ) {
        QTransactions transactions = new QTransactions("transactions_union");
        QTransfert transfert = new QTransfert("transfers_union");

        // Create a subquery for transactions
        SQLQuery<LocalDate> transactionsQuery = SQLExpressions
            .select(transactions.date)
            .from(transactions)
            .where(transactions.date.between(startDate, endDate));
            
        // Create a subquery for transfers
        SQLQuery<LocalDate> transfertsQuery = SQLExpressions
            .select(transfert.date)
            .from(transfert)
            .where(transfert.date.between(startDate, endDate));

        // Use union as a subquery with SQL template
        return SQLExpressions
            .select(Expressions.path(LocalDate.class, "date"))
            .from(Expressions.template(
                Object.class,
                "({0} UNION ALL {1}) as union_table",
                transactionsQuery,
                transfertsQuery
            ));
    }

    /**
     * Generate all possible combinations of months and accounts in date range
     *
     * @param startDate The start date of the range (inclusive)
     * @param endDate   The end date of the range (inclusive)
     * @return List of all account snapshots for each month in the date range
     */
    public SQLQuery<AccountMonthSnapshot> selectAllAccountByMonth(LocalDate startDate, LocalDate endDate) {
        QAccounts accounts = new QAccounts("accounts_by_month");

        // Create a subquery to get distinct months from transactions and transfers
        SQLQuery<LocalDate> monthsSubquery = SQLExpressions
            .select(
                Expressions.dateTemplate(
                    LocalDate.class,
                    "DATE_FORMAT({0}, '%Y-%m-01')",
                    Expressions.path(LocalDate.class, "date")
                )
            )
            .from(
                SQLExpressions
                    .select(Expressions.path(LocalDate.class, "date"))
                    .from(selectAllTransactionsDateBetweenSubQuery(startDate, endDate))
                    .as("allMonths")
            )
            .groupBy(Expressions.dateTemplate(
                LocalDate.class,
                "DATE_FORMAT({0}, '%Y-%m-01')",
                Expressions.path(LocalDate.class, "date")
            ));

        // Cross join accounts with months to get all combinations
        return transactionManager
            .selectQuery()
            .select(
                Projections.constructor(
                    AccountMonthSnapshot.class,
                    accounts.id.as("account_id"),
                    accounts.name.as("account_name"),
                    accounts.shortName.as("account_short_name"),
                    accounts.type.as("account_type"),
                    accounts.initialAmount.as("initial_amount"),
                    Expressions.path(LocalDate.class, "months.month_date").as("snapshot_month")
                )
            )
            .from(accounts, monthsSubquery.as("months"));
    }

    /**
     * Calculates account totals by summing initial amounts, transactions, and transfers for each account by month.
     * This represents the AccountTotals CTE from the SQL query.
     *
     * @param startDate The start date of the range (inclusive)
     * @param endDate   The end date of the range (inclusive)
     * @return A query that calculates total amounts for each account by month
     */
    public SQLQuery<AccountTotalSnapshot> selectAccountTotalsSubQuery(LocalDate startDate, LocalDate endDate) {
        QTransactions transactions = new QTransactions("transactions_total");
        QTransfert transfert = new QTransfert("transfers_total");

        // Get the monthly snapshots first
        SQLQuery<AccountMonthSnapshot> monthlySnapshots = selectAllAccountByMonth(startDate, endDate);

        // Create subqueries for the different calculations
        return transactionManager
            .selectQuery()
            .select(
                Projections.constructor(
                    AccountTotalSnapshot.class,
                    Expressions.path(Long.class, "ms.accountId"),
                    Expressions.path(String.class, "ms.accountName"),
                    Expressions.path(String.class, "ms.accountShortName"),
                    Expressions.path(String.class, "ms.accountType"),
                    Expressions.path(LocalDate.class, "ms.snapshotMonth"),
                    Expressions.numberTemplate(
                        BigDecimal.class,
                        "ms.initialAmount + " +
                            // Add credit transactions
                            "COALESCE((" +
                            "SELECT SUM(amount) " +
                            "FROM " + transactions.getTableName() + " " +
                            "WHERE account_id = ms.accountId " +
                            "AND side = 'CREDIT' " +
                            "AND date <= LAST_DAY(ms.snapshotMonth)" +
                            "), 0) - " +
                            // Subtract debit transactions
                            "COALESCE((" +
                            "SELECT SUM(amount) " +
                            "FROM " + transactions.getTableName() + " " +
                            "WHERE account_id = ms.accountId " +
                            "AND side = 'DEBIT' " +
                            "AND date <= LAST_DAY(ms.snapshotMonth)" +
                            "), 0) + " +
                            // Add incoming transfers
                            "COALESCE((" +
                            "SELECT SUM(amount) " +
                            "FROM " + transfert.getTableName() + " " +
                            "WHERE to_account_id = ms.accountId " +
                            "AND date <= LAST_DAY(ms.snapshotMonth)" +
                            "), 0) - " +
                            // Subtract outgoing transfers
                            "COALESCE((" +
                            "SELECT SUM(amount) " +
                            "FROM " + transfert.getTableName() + " " +
                            "WHERE from_account_id = ms.accountId " +
                            "AND date <= LAST_DAY(ms.snapshotMonth)" +
                            "), 0)"
                    ).as("totalAmount")
                )
            )
            .from(monthlySnapshots);
    }

    /**
     * Retrieves the final result set with account totals and month-over-month gain/loss calculations.
     *
     * @param startDate The start date of the range (inclusive)
     * @param endDate   The end date of the range (inclusive)
     * @return List of evolution results with account details, monthly totals, and gain/loss calculations
     */
    public List<EvolutionResult> selectResult(
        LocalDate startDate,
        LocalDate endDate
    ) {
        // Get the account totals query as a subquery
        SQLQuery<AccountTotalSnapshot> accountTotalsQuery = selectAccountTotalsSubQuery(startDate, endDate);

        // Aliases for the subqueries
        String currentMonthAlias = "current_month";
        String prevMonthAlias = "prev_month";

        return transactionManager
            .selectQuery()
            .select(
                Projections.constructor(
                    EvolutionResult.class,
                    Expressions.path(String.class, currentMonthAlias + ".accountShortName"),
                    Expressions.path(String.class, currentMonthAlias + ".accountName"),
                    Expressions.path(Long.class, currentMonthAlias + ".accountId"),
                    Expressions.path(String.class, currentMonthAlias + ".accountType"),
                    Expressions.path(LocalDate.class, currentMonthAlias + ".snapshotMonth").as("month"),
                    Expressions.path(BigDecimal.class, currentMonthAlias + ".totalAmount"),
                    Expressions.numberTemplate(
                        BigDecimal.class,
                        "{0} - COALESCE({1}, {0})",
                        Expressions.path(BigDecimal.class, currentMonthAlias + ".totalAmount"),
                        Expressions.path(BigDecimal.class, prevMonthAlias + ".totalAmount")
                    ).as("gainLoss")
                )
            )
            .from(accountTotalsQuery, Expressions.stringPath(currentMonthAlias))
            .leftJoin(accountTotalsQuery, Expressions.stringPath(prevMonthAlias))
            .on(
                Expressions.path(Long.class, currentMonthAlias + ".accountId")
                    .eq(Expressions.path(Long.class, prevMonthAlias + ".accountId"))
                    .and(
                        Expressions.dateTemplate(
                            LocalDate.class,
                            "DATE_FORMAT(DATE_SUB({0}, INTERVAL 1 MONTH), '%Y-%m-01')",
                            Expressions.path(LocalDate.class, currentMonthAlias + ".snapshotMonth")
                        ).eq(Expressions.path(LocalDate.class, prevMonthAlias + ".snapshotMonth"))
                    )
            )
            .where(
                Expressions.datePath(LocalDate.class, currentMonthAlias + ".snapshotMonth").goe(startDate)
                    .and(Expressions.datePath(LocalDate.class, currentMonthAlias + ".snapshotMonth").loe(endDate))
            )
            .orderBy(
                Expressions.datePath(LocalDate.class, currentMonthAlias + ".snapshotMonth").asc(),
                Expressions.numberPath(Long.class, currentMonthAlias + ".accountId").asc(),
                Expressions.stringPath(currentMonthAlias + ".accountName").asc()
            )
            .fetch();
    }
}

