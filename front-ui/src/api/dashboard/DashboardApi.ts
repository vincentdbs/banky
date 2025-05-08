import ApiHttpClient from '@api/ApiHttpClient';
import { DashboardAccountsResponse } from '@api/dashboard/DashboardTypes';
import { HttpMethod } from 'simple-http-request-builder';
import { HttpPromise } from 'simple-http-rest-client';

/**
 * API service for retrieving dashboard-related data from the backend.
 * Provides methods to fetch dashboard account information including
 * checking, savings, and market accounts with their relevant metrics.
 */
export default class DashboardApi {
  private static BASE_PATH: string = '/dashboard';

  constructor(private apiHttpClient: ApiHttpClient) {}

  /**
   * Fetches all account data for the dashboard display.
   * Returns aggregated account information organized by account type.
   */
  fetchDashboardAccounts(): HttpPromise<DashboardAccountsResponse> {
    return this.apiHttpClient
      .restRequest<DashboardAccountsResponse>(
      HttpMethod.GET,
      `${DashboardApi.BASE_PATH}/accounts`,
    )
      .execute();
  }
}
