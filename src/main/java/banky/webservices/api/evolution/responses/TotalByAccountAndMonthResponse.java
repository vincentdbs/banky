package banky.webservices.api.evolution.responses;

import banky.services.accounts.enums.AccountType;

import java.math.BigDecimal;
import java.util.Map;

/**
 * Represents the total amounts for a month with breakdown by account types
 * Corresponds to the TotalByAccountAndMonth type in the frontend
 */
public record TotalByAccountAndMonthResponse(
    BigDecimal total,
    BigDecimal gainLoss,
    BigDecimal gainLossPercentage,
    Map<AccountType, TotalByCategoryResponse> totalByCategory
) {}