package banky.webservices.api.evolution.responses;

/**
 * Represents the total amounts for a single account in the evolution report
 * Corresponds to the TotalByAccount type in the frontend
 */
public record TotalByAccountResponse(
    String id,
    String shortName,
    String name,
    double total,
    double gainLoss,
    double gainLossPercentage
) {}