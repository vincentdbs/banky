package banky.webservices.api.evolution.responses;

import banky.webservices.serializer.ThreeDecimalToStringSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.math.BigDecimal;

/**
 * Represents a category with budgeting information in the monthly budget
 */
public record MonthlyBudgetCategoryResponse(
    String name,
    @JsonSerialize(using = ThreeDecimalToStringSerializer.class)
    BigDecimal spent,
    @JsonSerialize(using = ThreeDecimalToStringSerializer.class)
    BigDecimal budgeted,
    @JsonSerialize(using = ThreeDecimalToStringSerializer.class)
    BigDecimal spentPercentage,
    @JsonSerialize(using = ThreeDecimalToStringSerializer.class)
    BigDecimal budgetedPercentage
) {
}