package banky.webservices.api.evolution.responses;

import banky.webservices.serializer.TwoDecimalToStringSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.math.BigDecimal;
import java.util.List;

/**
 * Response object for the monthly budget endpoint.
 * Contains categories, totals, and balances related to monthly budget information.
 */
public record MonthlyBudgetResponse(
    List<MonthlyBudgetCategoryResponse> categories,
    @JsonSerialize(using = TwoDecimalToStringSerializer.class)
    BigDecimal total,
    @JsonSerialize(using = TwoDecimalToStringSerializer.class)
    BigDecimal spentPercentageOfBudgeted,
    @JsonSerialize(using = TwoDecimalToStringSerializer.class)
    BigDecimal budgetedTotal,
    @JsonSerialize(using = TwoDecimalToStringSerializer.class)
    BigDecimal spentPercentageOfTotal,
    @JsonSerialize(using = TwoDecimalToStringSerializer.class)
    BigDecimal totalWithoutSavings,
    @JsonSerialize(using = TwoDecimalToStringSerializer.class)
    BigDecimal spentWithoutSavingsPercentage,
    @JsonSerialize(using = TwoDecimalToStringSerializer.class)
    BigDecimal budgetedTotalWithoutSavings,
    @JsonSerialize(using = TwoDecimalToStringSerializer.class)
    BigDecimal budgetedWithoutSavingsPercentage,
    @JsonSerialize(using = TwoDecimalToStringSerializer.class)
    BigDecimal balance,
    @JsonSerialize(using = TwoDecimalToStringSerializer.class)
    BigDecimal balanceWithoutSavings,
    @JsonSerialize(using = TwoDecimalToStringSerializer.class)
    BigDecimal orderCharges,
    @JsonSerialize(using = TwoDecimalToStringSerializer.class)
    BigDecimal savings,
    @JsonSerialize(using = TwoDecimalToStringSerializer.class)
    BigDecimal budgetedSavings
) {
}