import ApiHttpClient from '@api/ApiHttpClient';
import { HttpMethod } from 'simple-http-request-builder';
import { HttpPromise } from 'simple-http-rest-client';
import { MonthlyBudgetResponse } from './EvolutionTypes';

export default class EvolutionApi {
  private static BASE_PATH: string = '/evolutions';

  constructor(private apiHttpClient: ApiHttpClient) {}

  /**
   * Fetches the monthly budget data
   * 
   * @returns A promise with the monthly budget data
   */
  fetchMonthlyBudget(date: string): HttpPromise<MonthlyBudgetResponse> {
    return this.apiHttpClient
      .restRequest<MonthlyBudgetResponse>(HttpMethod.GET, `${EvolutionApi.BASE_PATH}/budgets/monthly`)
      .queryParams([['date', date]])
      .execute();
  }
}
