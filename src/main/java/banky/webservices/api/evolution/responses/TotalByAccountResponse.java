package banky.webservices.api.evolution.responses;

import banky.webservices.serializer.ThreeDecimalToStringSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.math.BigDecimal;

/**
 * Represents the total amounts for a single account in the evolution report
 * Corresponds to the TotalByAccount type in the frontend
 */
public record TotalByAccountResponse(
    String id,
    String shortName,
    String name,
    @JsonSerialize(using = ThreeDecimalToStringSerializer.class)
    BigDecimal total,
    @JsonSerialize(using = ThreeDecimalToStringSerializer.class)
    BigDecimal gainLoss,
    @JsonSerialize(using = ThreeDecimalToStringSerializer.class)
    BigDecimal gainLossPercentage
) {}