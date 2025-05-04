package banky.webservices.api.evolution.responses;

import java.math.BigDecimal;

/**
 * Represents the total amounts for a single account in the evolution report
 * Corresponds to the TotalByAccount type in the frontend
 */
public record TotalByAccountResponse(
    String id,
    String shortName,
    String name,
    BigDecimal total,
    BigDecimal gainLoss,
    BigDecimal gainLossPercentage
) {}