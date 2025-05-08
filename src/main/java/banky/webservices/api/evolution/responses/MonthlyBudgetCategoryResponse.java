package banky.webservices.api.evolution.responses;

import banky.webservices.serializer.TwoDecimalToStringSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.math.BigDecimal;

/**
 * Represents a category with budgeting information in the monthly budget
 */
public record MonthlyBudgetCategoryResponse(
    String name,
    @JsonSerialize(using = TwoDecimalToStringSerializer.class)
    BigDecimal spent,
    @JsonSerialize(using = TwoDecimalToStringSerializer.class)
    BigDecimal budgeted,
    @JsonSerialize(using = TwoDecimalToStringSerializer.class)
    BigDecimal spentPercentageOfBudgeted,
    @JsonSerialize(using = TwoDecimalToStringSerializer.class)
    BigDecimal spentPercentageOfTotal
) {
}