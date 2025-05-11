package banky.webservices.api.evolution.responses;

import banky.webservices.serializer.TwoDecimalToStringSerializer;
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
    @JsonSerialize(using = TwoDecimalToStringSerializer.class)
    BigDecimal total,
    @JsonSerialize(using = TwoDecimalToStringSerializer.class)
    BigDecimal gainLoss,
    @JsonSerialize(using = TwoDecimalToStringSerializer.class)
    BigDecimal gainLossPercentage
) {}