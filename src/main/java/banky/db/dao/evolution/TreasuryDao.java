package banky.db.dao.evolution;

import banky.db.dao.TotalByAccountDao;
import banky.db.dao.evolution.data.AccountMonthSnapshot;
import banky.db.generated.QAccounts;
import banky.db.generated.QTransactions;
import banky.db.generated.QTransfert;
import banky.guice.ApplicationModule;
import com.coreoz.plume.db.querydsl.transaction.TransactionManagerQuerydsl;
import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.Stage;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.SimplePath;
import com.querydsl.sql.SQLQuery;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import java.time.LocalDate;

/**
 * Data Access Object for evolution-related database operations.
 * Provides methods to fetch data for treasury evolution reports.
 */
@Singleton
public class TreasuryDao extends TotalByAccountDao {
    // Monthly snapshots
    private final static QAccounts monthlySnapshotAccounts = new QAccounts("monthly_snapshot_accounts");
    private final static String snapshotMonth = "snapshot_month";

    // Cross join months
    private final static QTransactions crossJoinTransactions = new QTransactions("cross_join_months_transactions");
    private final static QTransfert crossJoinMonthsTransferts = new QTransfert("cross_join_months_transferts");
    private final static String months = "months";
    private final static String monthsDate = "monthsDate";

    // Account totals

    @Inject
    private TreasuryDao(TransactionManagerQuerydsl transactionManager) {
        super(transactionManager);
    }

    public static void main(String[] args) {
        Injector injector = Guice.createInjector(Stage.PRODUCTION, new ApplicationModule());
        TreasuryDao evolutionDao = injector.getInstance(TreasuryDao.class);
        LocalDate startDate = LocalDate.of(2020, 1, 1);
        int numberOfMonths = 1;
        var result = evolutionDao.fetchEvolutionTotals(startDate, numberOfMonths);
    }

    public SQLQuery fetchEvolutionTotals(LocalDate startDate, LocalDate endDate) {
        transactionManager
            .selectQuery()
            .select(
//                TODO à compléter
            )
    }


    public SQLQuery accountTotal(LocalDate startDate, LocalDate endDate) {
        QTransactions credit = new QTransactions("credit");
        QTransactions debit = new QTransactions("debit");
        QTransfert incoming = new QTransfert("incoming");
        QTransfert outcoming = new QTransfert("outcoming");

        return transactionManager
            .selectQuery()
            .select(
                monthlySnapshotAccounts.id,
                monthlySnapshotAccounts.name,
                monthlySnapshotAccounts.shortName,
                monthlySnapshotAccounts.type,
                snapshotMonth,
                monthlySnapshotAccounts.initialAmount
                    .add(
                        transactionManager
                            .selectQuery()
                            .select(credit.amount.sum())
                            .from(credit)
                            .where(
                                credit.accountId.eq(monthlySnapshotAccounts.id)
                                    .and(credit.side.eq("CREDIT"))
//                                    .and(credit.date.loe(monthsDate)) // TODO LAST_DAY(ms.snapshot_month)
                            )
                    )
                    .subtract(
                        transactionManager
                            .selectQuery()
                            .select(debit.amount.sum())
                            .from(debit)
                            .where(
                                debit.accountId.eq(monthlySnapshotAccounts.id)
                                    .and(debit.side.eq("DEBIT"))
//                                    .and(debit.date.loe(monthsDate)) // TODO LAST_DAY(ms.snapshot_month)
                            )
                    )
                    .add(
                        transactionManager
                            .selectQuery()
                            .select(incoming.amount.sum())
                            .from(incoming)
                            .where(
                                incoming.toAccountId.eq(monthlySnapshotAccounts.id)
//                                    .and(incoming.date.loe(monthsDate)) // TODO LAST_DAY(ms.snapshot_month)
                            )
                    )
                    .subtract(
                        transactionManager
                            .selectQuery()
                            .select(outcoming.amount.sum())
                            .from(outcoming)
                            .where(
                                outcoming.fromAccountId.eq(monthlySnapshotAccounts.id)
//                                    .and(outcoming.date.loe(monthsDate)) // TODO LAST_DAY(ms.snapshot_month)
                            )
                    )
            )
            .from(monthsQuery(startDate, endDate));
    }

    public SQLQuery<AccountMonthSnapshot> monthlySnapshot(LocalDate startDate, LocalDate endDate) {
        return transactionManager
            .selectQuery()
            .select(
                Projections.constructor(
                    AccountMonthSnapshot.class,
                    monthlySnapshotAccounts.id,
                    monthlySnapshotAccounts.name,
                    monthlySnapshotAccounts.shortName,
                    monthlySnapshotAccounts.type,
                    monthlySnapshotAccounts.initialAmount,
                    Expressions.dateTemplate(
                        LocalDate.class,
                        "DATE_FORMAT("+ monthsDate+", '%Y-%m-01')",
                        Expressions.path(LocalDate.class, snapshotMonth)
                    )
                )
            )
            .from(monthlySnapshotAccounts)
            .fullJoin(monthsQuery(startDate, endDate));
    }

    // Month query
    public SQLQuery<LocalDate> monthsQuery(LocalDate startDate, LocalDate endDate) {
        // Create a subquery to get distinct months from transactions and transfers
        return transactionManager
            .selectQuery()
            .select(
                Expressions.dateTemplate(
                    LocalDate.class,
                    "DATE_FORMAT({0}, '%Y-%m-01')",
                    Expressions.path(LocalDate.class, monthsDate)
                )
            )
            .from(
                transactionManager.selectQuery()
                    .select(crossJoinMonthsTransferts.date)
                    .from(crossJoinMonthsTransferts)
                    .where(crossJoinMonthsTransferts.date.between(startDate, endDate))
                    .union(
                        transactionManager.selectQuery()
                            .select(crossJoinTransactions.date)
                            .from(crossJoinTransactions)
                            .where(crossJoinTransactions.date.between(startDate, endDate))
                    )
            );
    }
}

