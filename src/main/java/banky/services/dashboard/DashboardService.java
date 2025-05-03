package banky.services.dashboard;

import banky.db.dao.DashboardDao;
import banky.webservices.api.dashboard.data.DashboardAccountsResponse;
import banky.webservices.api.dashboard.data.DashboardCheckingAccountResponse;
import banky.webservices.api.dashboard.data.DashboardMarketAccountResponse;
import banky.webservices.api.dashboard.data.DashboardSavingAccountResponse;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import java.util.List;

/**
 * Service handling business logic for fetching and aggregating dashboard data.
 * This service coordinates retrieving specialized account data from the DAO
 * for presentation on the dashboard.
 */
@Singleton
public class DashboardService {

    private final DashboardDao dashboardDao;

    @Inject
    public DashboardService(DashboardDao dashboardDao) {
        this.dashboardDao = dashboardDao;
    }

    /**
     * Fetches data for all account types to be displayed on the dashboard.
     * Retrieves checking, savings, and market account data and aggregates them into a single response.
     *
     * @return A complete dashboard response with data for all account types
     */
    public DashboardAccountsResponse fetchDashboardAccounts() {
        List<DashboardCheckingAccountResponse> checkingAccounts = fetchCheckingAccountData();
        List<DashboardSavingAccountResponse> savingsAccounts = fetchSavingsAccountData();
        List<DashboardMarketAccountResponse> marketAccounts = fetchMarketAccountData();

        return new DashboardAccountsResponse(
            checkingAccounts,
            savingsAccounts,
            marketAccounts
        );
    }

    /**
     * Fetches data specific to checking accounts for the dashboard.
     * Includes name, short name, color, real total amount, and in-bank amount.
     *
     * @return List of checking accounts with dashboard-specific data
     */
    private List<DashboardCheckingAccountResponse> fetchCheckingAccountData() {
        return dashboardDao.getCheckingAccountData();
    }

    /**
     * Fetches data specific to savings accounts for the dashboard.
     * Includes name, short name, color, total amount, and interest amount.
     *
     * @return List of savings accounts with dashboard-specific data
     */
    private List<DashboardSavingAccountResponse> fetchSavingsAccountData() {
        return dashboardDao.getSavingsAccountData();
    }

    /**
     * Fetches data specific to market accounts for the dashboard.
     * Includes name, short name, color, and total amount.
     *
     * @return List of market accounts with dashboard-specific data
     */
    private List<DashboardMarketAccountResponse> fetchMarketAccountData() {
        return dashboardDao.getMarketAccountData();
    }
}