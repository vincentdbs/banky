package banky.webservices.api.evolution.responses;

import java.math.BigDecimal;
import java.util.List;

/**
 * Represents the total amounts for a category in the evolution report
 * Corresponds to the TotalByCategory type in the frontend
 */
public record TotalByCategoryResponse(
    BigDecimal total,
    BigDecimal gainLoss,
    BigDecimal gainLossPercentage,
    List<TotalByAccountResponse> totalByAccount
) {}