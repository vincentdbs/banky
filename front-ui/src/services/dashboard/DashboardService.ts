import DashboardApi from '@api/dashboard/DashboardApi';

/**
 * Service that manages dashboard-related business logic.
 * Provides access to dashboard data including account information
 * and metrics, with loading state management.
 */
export default class DashboardService {
  constructor(private readonly dashboardApi: DashboardApi) {}

  /**
   * Fetches all dashboard account data from the API.
   * Updates the observable state with loading status, results, and any errors.
   */
  fetchDashboardAccounts(): void {
    this.dashboardApi.fetchDashboardAccounts();
  }
}