package banky.services.evolution;

import banky.db.dao.OrdersDao;
import banky.db.dao.TransactionsDao;
import banky.db.dao.TransfertDao;
import banky.db.dao.category.CategoryDao;
import banky.db.dao.category.data.SpentByCategory;
import banky.services.evolution.data.MonthlyBudgetType;
import banky.webservices.api.evolution.responses.MonthlyBudgetCategoryResponse;
import banky.webservices.api.evolution.responses.MonthlyBudgetResponse;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;

/**
 * Service that provides monthly budget data analysis.
 * Processes raw transaction data into budget summaries grouped by category.
 * Calculates totals, percentages, and balances.
 */
@Singleton
public class MonthlyBudgetService {
    private final static BigDecimal BUDGETED_SAVINGS = new BigDecimal(900);
    private final static BigDecimal THEORETICAL_INCOME = new BigDecimal(2400);

    private final TransactionsDao transactionsDao;
    private final TransfertDao transfertDao;
    private final OrdersDao ordersDao;
    private final CategoryDao categoryDao;

    @Inject
    private MonthlyBudgetService(
        TransactionsDao transactionsDao,
        TransfertDao transfertDao,
        OrdersDao ordersDao,
        CategoryDao categoryDao
    ) {
        this.transactionsDao = transactionsDao;
        this.categoryDao = categoryDao;
        this.transfertDao = transfertDao;
        this.ordersDao = ordersDao;
    }

    /**
     * Fetches monthly budget data for a specific month.
     * Retrieves transaction data, calculates percentages and balances.
     *
     * @param date The date correspond to the month to fetch data for
     * @param type The type of monthly budget to fetch (e.g., actual, theoretical)
     * @return A MonthlyBudgetResponse containing the complete monthly budget data
     */
    public MonthlyBudgetResponse fetchMonthlyBudget(LocalDate date, MonthlyBudgetType type) {
        // Ensure the date is the first day of the month
        LocalDate firstDayOfTheMonth = date.withDayOfMonth(1);

        BigDecimal income = MonthlyBudgetType.THEORETICAL.equals(type)
            ? THEORETICAL_INCOME
            : transactionsDao.fetchIncomeByMonth(firstDayOfTheMonth);

        List<SpentByCategory> spentByCategories = categoryDao.fetchSpentByCategoryByMonth(firstDayOfTheMonth);

        // Transform SpentByCategory to MonthlyBudgetCategoryResponse
        List<MonthlyBudgetCategoryResponse> categories = buildMonthlyBudgetCategoryResponseFromSpentByCategories(spentByCategories, income);

        // Order charges
        BigDecimal orderChargesTotal = ordersDao.fetchChargesAmountByMonth(firstDayOfTheMonth);

        // Savings transfers
        BigDecimal savingsTransfertsTotal = transfertDao.fetchSavingsAmountByMonth(firstDayOfTheMonth);

        // Calculate totals without savings
        BigDecimal totalWithoutSavings = calculateTotalSpent(spentByCategories).add(orderChargesTotal);
        BigDecimal budgetedTotalWithoutSavings = calculateBudgetedTotal(spentByCategories);

        // Calculate total spent
        BigDecimal total = totalWithoutSavings.add(savingsTransfertsTotal);
        BigDecimal budgetedTotal = budgetedTotalWithoutSavings.add(BUDGETED_SAVINGS);

        // Calculate percentages
        BigDecimal spentWithoutSavingsPercentage = calculatePercentage(totalWithoutSavings, budgetedTotalWithoutSavings);
        BigDecimal spentPercentageOfBudgeted = calculatePercentage(total, budgetedTotal);
        BigDecimal budgetedWithoutSavingsPercentage = calculatePercentage(calculateSumOfBudgetedPercentage(categories), budgetedTotal);
        BigDecimal spentPercentageOfTotal = calculatePercentage(budgetedTotal, income);

        // Calculate balances
        BigDecimal balance = budgetedTotalWithoutSavings.subtract(totalWithoutSavings);
        BigDecimal balanceWithoutSavings = budgetedTotalWithoutSavings.subtract(totalWithoutSavings);

        return new MonthlyBudgetResponse(
            categories,
            total,
            spentPercentageOfBudgeted,
            budgetedTotal,
            spentPercentageOfTotal,
            totalWithoutSavings,
            spentWithoutSavingsPercentage,
            budgetedTotalWithoutSavings,
            budgetedWithoutSavingsPercentage,
            balance,
            balanceWithoutSavings,
            orderChargesTotal,
            savingsTransfertsTotal,
            BUDGETED_SAVINGS
        );
    }

    /**
     * Transforms a list of SpentByCategory to MonthlyBudgetCategoryResponse.
     *
     * @param spentByCategories List of SpentByCategory
     * @return List of transformed MonthlyBudgetCategoryResponse
     */
    private List<MonthlyBudgetCategoryResponse> buildMonthlyBudgetCategoryResponseFromSpentByCategories(
        List<SpentByCategory> spentByCategories,
        BigDecimal income
    ) {
        return spentByCategories.stream()
            .map(category -> {
                // Calculate percentages
                BigDecimal spentPercentage = calculatePercentage(category.spent(), category.budgeted());
                BigDecimal budgetedPercentage = calculatePercentage(category.spent(), income);

                return new MonthlyBudgetCategoryResponse(
                    category.name(),
                    category.spent(),
                    category.budgeted(),
                    spentPercentage,
                    budgetedPercentage
                );
            })
            .toList();
    }

    /**
     * Calculates the total spent amount from all categories.
     *
     * @param categories List of SpentByCategory with spent amounts
     * @return The total spent amount
     */
    private BigDecimal calculateTotalSpent(List<SpentByCategory> categories) {
        return categories.stream()
            .map(SpentByCategory::spent)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    /**
     * Calculates the total budgeted amount from all categories.
     *
     * @param categories List of budget categories with budgeted amounts
     * @return The total budgeted amount
     */
    private BigDecimal calculateBudgetedTotal(List<SpentByCategory> categories) {
        return categories.stream()
            .map(SpentByCategory::budgeted)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private BigDecimal calculateSumOfBudgetedPercentage(List<MonthlyBudgetCategoryResponse> categories) {
        return categories.stream()
            .map(MonthlyBudgetCategoryResponse::spentPercentageOfTotal)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    /**
     * Calculates a percentage value based on a part and total.
     *
     * @param part  The part value
     * @param total The total value
     * @return The percentage as a BigDecimal
     */
    private BigDecimal calculatePercentage(BigDecimal part, BigDecimal total) {
        if (total.compareTo(BigDecimal.ZERO) == 0) {
            return BigDecimal.ZERO;
        }
        return part.multiply(BigDecimal.valueOf(100))
            .divide(total, 3, RoundingMode.HALF_UP);
    }
}