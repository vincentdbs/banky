package banky.webservices.api.evolution.responses;

import banky.webservices.serializer.ThreeDecimalToStringSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.math.BigDecimal;
import java.util.List;

/**
 * Represents the total amounts for a category in the evolution report
 * Corresponds to the TotalByCategory type in the frontend
 */
public record TotalByCategoryResponse(
    @JsonSerialize(using = ThreeDecimalToStringSerializer.class)
    BigDecimal total,
    @JsonSerialize(using = ThreeDecimalToStringSerializer.class)
    BigDecimal gainLoss,
    @JsonSerialize(using = ThreeDecimalToStringSerializer.class)
    BigDecimal gainLossPercentage,
    List<TotalByAccountResponse> totalByAccount
) {}