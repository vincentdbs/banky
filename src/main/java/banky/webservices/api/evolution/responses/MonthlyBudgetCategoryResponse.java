package banky.webservices.api.evolution.responses;

/**
 * Represents a category with budgeting information in the monthly budget
 */
public record MonthlyBudgetCategoryResponse(
    String name,
    String spent,
    String budgeted,
    String spentPercentage,
    String budgetedPercentage
) {
}