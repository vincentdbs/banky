import DashboardApi from '@api/dashboard/DashboardApi';
import { DashboardAccountsResponse } from '@api/dashboard/DashboardTypes';
import { HttpPromise } from 'simple-http-rest-client';

/**
 * Service that manages dashboard-related business logic.
 * Provides access to dashboard data including account information
 * and metrics, with loading state management.
 */
export default class DashboardService {
  constructor(private readonly dashboardApi: DashboardApi) {}

  /**
   * Fetches all dashboard account data from the API.
   * Returns a promise containing the dashboard accounts response.
   */
  fetchDashboardAccounts(): HttpPromise<DashboardAccountsResponse> {
    return this.dashboardApi.fetchDashboardAccounts();
  }
}