package banky.webservices.api.dashboard.data;

import java.util.List;

/**
 * Aggregated response containing all types of accounts data for the dashboard.
 * Includes separate lists for checking, savings and market accounts.
 */
public record DashboardAccountsResponse(
    List<DashboardCheckingAccountResponse> checkingAccounts,
    List<DashboardSavingAccountResponse> savingsAccounts,
    List<DashboardMarketAccountResponse> marketAccounts
) {
}