package banky.webservices.api.evolution.responses;

import java.util.List;

/**
 * Represents the monthly budget data including totals, percentages, and categories
 */
public record MonthlyBudgetResponse(
    String total,
    String budgetedTotal,
    String spentPercentage,
    String budgetedPercentage,
    String totalWithoutSavings,
    String budgetedTotalWithoutSavings,
    String spentWithoutSavingsPercentage,
    String budgetedWithoutSavingsPercentage,
    List<MonthlyBudgetCategoryResponse> categories,
    String balance,
    String balanceWithoutSavings
) {
}