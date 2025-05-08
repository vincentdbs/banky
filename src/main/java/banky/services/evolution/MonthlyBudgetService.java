package banky.services.evolution;

import banky.db.dao.evolution.EvolutionDao;
import banky.db.dao.evolution.data.SpentByCategory;
import banky.webservices.api.evolution.responses.MonthlyBudgetCategoryResponse;
import banky.webservices.api.evolution.responses.MonthlyBudgetResponse;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * Service that provides monthly budget data analysis.
 * Processes raw transaction data into budget summaries grouped by category.
 * Calculates totals, percentages, and balances.
 */
@Singleton
public class MonthlyBudgetService {

    private final EvolutionDao evolutionDao;

    @Inject
    private MonthlyBudgetService(EvolutionDao evolutionDao) {
        this.evolutionDao = evolutionDao;
    }

    /**
     * Fetches monthly budget data including categories, totals, and balances.
     * Uses the current month as the default time period.
     *
     * @return A MonthlyBudgetResponse containing the complete monthly budget data
     */
    public MonthlyBudgetResponse fetchMonthlyBudget() {
        // Default to current month if no date is specified
        LocalDate firstDayOfCurrentMonth = LocalDate.now().withDayOfMonth(1);
        return fetchMonthlyBudget(firstDayOfCurrentMonth);
    }
    
    /**
     * Fetches monthly budget data for a specific month.
     * Retrieves transaction data, calculates percentages and balances.
     *
     * @param firstDayOfTheMonth The first day of the month to fetch data for
     * @return A MonthlyBudgetResponse containing the complete monthly budget data
     */
    public MonthlyBudgetResponse fetchMonthlyBudget(LocalDate firstDayOfTheMonth) {
        List<SpentByCategory> categories = evolutionDao.fetchMonthlyBudget(firstDayOfTheMonth);
        
        // Calculate totals and percentages
        BigDecimal total = calculateTotal(categories);
        BigDecimal budgetedTotal = calculateBudgetedTotal(categories);
        
        // Calculate totals without savings (filter out savings category)
        List<MonthlyBudgetCategoryResponse> categoriesWithoutSavings = filterOutSavingsCategory(categories);
        BigDecimal totalWithoutSavings = calculateTotal(categoriesWithoutSavings);
        BigDecimal budgetedTotalWithoutSavings = calculateBudgetedTotal(categoriesWithoutSavings);
        
        // Calculate percentages
        BigDecimal spentPercentage = calculatePercentage(total, budgetedTotal);
        BigDecimal budgetedPercentage = BigDecimal.valueOf(100);
        BigDecimal spentWithoutSavingsPercentage = calculatePercentage(totalWithoutSavings, budgetedTotalWithoutSavings);
        BigDecimal budgetedWithoutSavingsPercentage = BigDecimal.valueOf(100);
        
        // Calculate balances
        BigDecimal balance = budgetedTotal.subtract(total);
        BigDecimal balanceWithoutSavings = budgetedTotalWithoutSavings.subtract(totalWithoutSavings);
        
        return new MonthlyBudgetResponse(
            categories,
            total,
            spentPercentage,
            budgetedTotal,
            budgetedPercentage,
            totalWithoutSavings,
            spentWithoutSavingsPercentage,
            budgetedTotalWithoutSavings,
            budgetedWithoutSavingsPercentage,
            balance,
            balanceWithoutSavings
        );
    }
    
    /**
     * Calculates the total spent amount from all categories.
     *
     * @param categories List of budget categories with spent amounts
     * @return The total spent amount
     */
    private BigDecimal calculateTotal(List<MonthlyBudgetCategoryResponse> categories) {
        return categories.stream()
            .map(MonthlyBudgetCategoryResponse::spent)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
    
    /**
     * Calculates the total budgeted amount from all categories.
     *
     * @param categories List of budget categories with budgeted amounts
     * @return The total budgeted amount
     */
    private BigDecimal calculateBudgetedTotal(List<MonthlyBudgetCategoryResponse> categories) {
        return categories.stream()
            .map(MonthlyBudgetCategoryResponse::budgeted)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
    
    /**
     * Filters out the savings category from the list of categories.
     * This is used to calculate totals without including savings.
     *
     * @param categories List of budget categories
     * @return Filtered list without savings category
     */
    private List<MonthlyBudgetCategoryResponse> filterOutSavingsCategory(List<MonthlyBudgetCategoryResponse> categories) {
        // For now, we'll assume any category containing "savings" in its name is a savings category
        // In a real implementation, this would use a more robust identifier
        return categories.stream()
            .filter(category -> !category.name().toLowerCase().contains("savings"))
            .toList();
    }
    
    /**
     * Calculates a percentage value based on a part and total.
     *
     * @param part The part value
     * @param total The total value
     * @return The percentage as a BigDecimal
     */
    private BigDecimal calculatePercentage(BigDecimal part, BigDecimal total) {
        if (total.compareTo(BigDecimal.ZERO) == 0) {
            return BigDecimal.ZERO;
        }
        return part.multiply(BigDecimal.valueOf(100))
            .divide(total, 2, RoundingMode.HALF_UP);
    }
}