import ApiHttpClient from '@api/ApiHttpClient';
import {
  MonthlyBudgetType,
} from '@components/pages/evolution/monthly-budget/controls/MonthlyBudgetControls';
import { HttpMethod } from 'simple-http-request-builder';
import { HttpPromise } from 'simple-http-rest-client';
import { MonthlyBudgetResponse } from './EvolutionTypes';
import { AnnualTotal } from './TreasuryEvolutionTypes';
import { YearlyAccountTotalsResponse } from './YearlyAccountTotalsTypes';

export default class EvolutionApi {
  private static BASE_PATH: string = '/evolutions';

  constructor(private apiHttpClient: ApiHttpClient) {}

  /**
   * Fetches the monthly budget data
   *
   * @returns A promise with the monthly budget data
   */
  fetchMonthlyBudget(date: string, type: MonthlyBudgetType): HttpPromise<MonthlyBudgetResponse> {
    return this.apiHttpClient
      .restRequest<MonthlyBudgetResponse>(HttpMethod.GET, `${EvolutionApi.BASE_PATH}/budgets/monthly`)
      .queryParams([['date', date], ['type', type]])
      .execute();
  }

  /**
   * Fetches treasury evolution totals for a specific date range
   *
   * @param startDate The first month to include (in format YYYY-MM-DD)
   * @param numberOfMonths The number of months to fetch from the start date
   * @returns A promise with the treasury evolution data
   */
  fetchTreasuryEvolution(startDate: string, numberOfMonths: number): HttpPromise<AnnualTotal> {
    return this.apiHttpClient
      .restRequest<AnnualTotal>(HttpMethod.GET, `${EvolutionApi.BASE_PATH}/treasury`)
      .queryParams([['startDate', startDate], ['numberOfMonths', numberOfMonths]])
      .execute();
  }

  /**
   * Fetches account monthly totals for a specified year and two preceding years
   *
   * @param year The year for which to retrieve account totals
   * @returns A promise with the yearly account totals data mapped by date
   */
  fetchYearlyAccountTotals(year: number): HttpPromise<YearlyAccountTotalsResponse> {
    return this.apiHttpClient
      .restRequest<YearlyAccountTotalsResponse>(HttpMethod.GET, `${EvolutionApi.BASE_PATH}/accounts/yearly-totals`)
      .queryParams([['year', year.toString()]])
      .execute();
  }
}
