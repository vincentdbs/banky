package banky.services.evolution;

import banky.webservices.api.evolution.responses.MonthlyBudgetCategoryResponse;
import banky.webservices.api.evolution.responses.MonthlyBudgetResponse;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import java.math.BigDecimal;
import java.util.List;

/**
 * Service that provides data for evolution features, including the monthly budget.
 * Currently returns mock data, but would eventually fetch data from the database.
 */
@Singleton
public class EvolutionService {

    @Inject
    public EvolutionService() {
        // Constructor for dependency injection
    }

    /**
     * Fetches monthly budget data including categories, totals, and balances.
     * Currently returns mock data.
     *
     * @return A MonthlyBudgetResponse containing the complete monthly budget data
     */
    public MonthlyBudgetResponse fetchMonthlyBudget() {
        // Mock data for demonstration purposes
        List<MonthlyBudgetCategoryResponse> categories = List.of(
            new MonthlyBudgetCategoryResponse(
                "Housing",
                new BigDecimal("1200.00"),
                new BigDecimal(30),
                new BigDecimal("1250.00"),
                new BigDecimal(25)
            ),
            new MonthlyBudgetCategoryResponse(
                "Food",
                new BigDecimal("450.00"),
                new BigDecimal(11),
                new BigDecimal("500.00"),
                new BigDecimal(10)
            ),
            new MonthlyBudgetCategoryResponse(
                "Transportation",
                new BigDecimal("320.00"),
                new BigDecimal(8),
                new BigDecimal("350.00"),
                new BigDecimal(7)
            ),
            new MonthlyBudgetCategoryResponse(
                "Entertainment",
                new BigDecimal("280.00"),
                new BigDecimal(7),
                new BigDecimal("300.00"),
                new BigDecimal(6)
            ),
            new MonthlyBudgetCategoryResponse(
                "Utilities",
                new BigDecimal("320.00"),
                new BigDecimal(8),
                new BigDecimal("350.00"),
                new BigDecimal(7)
            ),
            new MonthlyBudgetCategoryResponse(
                "Savings",
                new BigDecimal("800.00"),
                new BigDecimal(20),
                new BigDecimal("1000.00"),
                new BigDecimal(20)
            ),
            new MonthlyBudgetCategoryResponse(
                "Other",
                new BigDecimal("630.00"),
                new BigDecimal(16),
                new BigDecimal("750.00"),
                new BigDecimal(15)
            )
        );

        BigDecimal total = new BigDecimal("4000.00");
        BigDecimal spentPercentage = new BigDecimal(80);
        BigDecimal budgetedTotal = new BigDecimal("5000.00");
        BigDecimal budgetedPercentage = new BigDecimal(100);

        BigDecimal totalWithoutSavings = new BigDecimal("3200.00");
        BigDecimal spentWithoutSavingsPercentage = new BigDecimal(64);
        BigDecimal budgetedTotalWithoutSavings = new BigDecimal("4000.00");
        BigDecimal budgetedWithoutSavingsPercentage = new BigDecimal(80);

        BigDecimal balance = new BigDecimal("1000.00");
        BigDecimal balanceWithoutSavings = new BigDecimal("800.00");

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
}