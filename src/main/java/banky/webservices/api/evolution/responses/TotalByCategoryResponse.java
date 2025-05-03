package banky.webservices.api.evolution.responses;

import java.util.List;

/**
 * Represents the total amounts for a category in the evolution report
 * Corresponds to the TotalByCategory type in the frontend
 */
public record TotalByCategoryResponse(
    double total,
    double gainLoss,
    double gainLossPercentage,
    List<TotalByAccountResponse> totalByAccount
) {}