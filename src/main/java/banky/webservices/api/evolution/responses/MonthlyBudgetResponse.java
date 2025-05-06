package banky.webservices.api.evolution.responses;

import banky.webservices.serializer.ThreeDecimalToStringSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.math.BigDecimal;
import java.util.List;

/**
 * Response object for the monthly budget endpoint.
 * Contains categories, totals, and balances related to monthly budget information.
 */
public record MonthlyBudgetResponse(
    List<MonthlyBudgetCategoryResponse> categories,
    @JsonSerialize(using = ThreeDecimalToStringSerializer.class)
    BigDecimal total,
    @JsonSerialize(using = ThreeDecimalToStringSerializer.class)
    BigDecimal spentPercentage,
    @JsonSerialize(using = ThreeDecimalToStringSerializer.class)
    BigDecimal budgetedTotal,
    @JsonSerialize(using = ThreeDecimalToStringSerializer.class)
    BigDecimal budgetedPercentage,
    @JsonSerialize(using = ThreeDecimalToStringSerializer.class)
    BigDecimal totalWithoutSavings,
    @JsonSerialize(using = ThreeDecimalToStringSerializer.class)
    BigDecimal spentWithoutSavingsPercentage,
    @JsonSerialize(using = ThreeDecimalToStringSerializer.class)
    BigDecimal budgetedTotalWithoutSavings,
    @JsonSerialize(using = ThreeDecimalToStringSerializer.class)
    BigDecimal budgetedWithoutSavingsPercentage,
    @JsonSerialize(using = ThreeDecimalToStringSerializer.class)
    BigDecimal balance,
    @JsonSerialize(using = ThreeDecimalToStringSerializer.class)
    BigDecimal balanceWithoutSavings
) {
}