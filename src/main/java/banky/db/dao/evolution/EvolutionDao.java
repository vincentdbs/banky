package banky.db.dao.evolution;

import banky.db.dao.evolution.data.SpentByCategory;
import banky.db.generated.QCategory;
import banky.db.generated.QSubCategory;
import banky.db.generated.QTransactions;
import banky.services.transactions.enums.TransactionSide;
import com.coreoz.plume.db.querydsl.transaction.TransactionManagerQuerydsl;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

/**
 * Data Access Object for evolution features.
 * Provides database access methods for budget analysis, spending trends,
 * and other financial evolution data.
 */
@Singleton
public class EvolutionDao {

    private final TransactionManagerQuerydsl transactionManager;

    @Inject
    private EvolutionDao(TransactionManagerQuerydsl transactionManager) {
        this.transactionManager = transactionManager;
    }

    /**
     * Fetch monthly budget data grouped by category showing spent amounts.
     * Only includes DEBIT transactions for the specified month.
     * Categories with no transactions for the month will be included with 0 spent amount.
     *
     * @param firstDayOfTheMonth The first day of the month to fetch data for
     * @return List of monthly budget categories with spent amounts
     */
    public List<SpentByCategory> fetchMonthlyBudget(LocalDate firstDayOfTheMonth) {
        QTransactions transactions = QTransactions.transactions;
        QCategory category = QCategory.category;
        QSubCategory subCategory = QSubCategory.subCategory;

        // Calculate the last day of the month
        LocalDate lastDayOfTheMonth = firstDayOfTheMonth.plusMonths(1).minusDays(1);

        // Query to fetch all categories and sum transactions if they exist
        return transactionManager
            .selectQuery()
            .select(
                category.name,
                transactions.amount.sum().coalesce(new BigDecimal(0)).as("spent"),
                category.budgetedAmount
            )
            .from(category)
            .leftJoin(subCategory)
            .on(category.id.eq(subCategory.categoryId))
            .leftJoin(transactions)
            .on(
                subCategory.id.eq(transactions.subCategoryId)
                .and(transactions.side.eq(TransactionSide.DEBIT.name()))
                .and(transactions.date.goe(firstDayOfTheMonth))
                .and(transactions.date.loe(lastDayOfTheMonth))
            )
            .groupBy(category.id)
            .orderBy(category.name.asc())
            .fetch()
            .stream()
            .map(tuple -> new SpentByCategory(
                tuple.get(category.name),
                tuple.get(transactions.amount.sum().coalesce(new BigDecimal(0)).as("spent")),
                tuple.get(category.budgetedAmount)
            ))
            .toList();
    }
}