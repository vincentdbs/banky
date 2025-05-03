package banky.webservices.api.evolution.responses;

import java.util.Map;

/**
 * Represents the annual totals data with breakdown by months
 * Corresponds to the AnnualTotal type in the frontend
 * The map keys are dates in the format "YYYY-MM-DD" representing the first day of each month
 */
public record AnnualTotalResponse(
    Map<String, TotalByAccountAndMonthResponse> monthlyTotals
) {}