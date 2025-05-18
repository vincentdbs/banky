import EvolutionApi from '@api/evolution/EvolutionApi';
import { MonthlyBudgetResponse } from '@api/evolution/EvolutionTypes';
import { AnnualTotal } from '@api/evolution/TreasuryEvolutionTypes';
import { YearlyAccountTotalsResponse } from '@api/evolution/YearlyAccountTotalsTypes';
import {
  MonthlyBudgetType,
} from '@components/pages/evolution/monthly-budget/controls/MonthlyBudgetControls';
import { formatToIsoDate } from '@utils/dates/DatesUtils';
import dayjs, { Dayjs } from 'dayjs';
import { HttpPromise } from 'simple-http-rest-client';

/**
 * Service for handling evolution data and operations
 * Provides methods to fetch and process monthly budget data
 */
export default class EvolutionService {
  constructor(private evolutionApi: EvolutionApi) {
  }

  /**
   * Fetches the monthly budget data
   *
   * @returns A promise with the monthly budget data
   */
  fetchMonthlyBudget(year: number, month: number, type: MonthlyBudgetType): HttpPromise<MonthlyBudgetResponse> {
    const date: Dayjs = dayjs().year(year).month(month).startOf('month');
    return this.evolutionApi.fetchMonthlyBudget(formatToIsoDate(date), type);
  }

  /**
   * Fetches treasury evolution totals for a specific date range
   *
   * @param startDate The first month to include
   * @param numberOfMonths The number of months to fetch from the start date
   * @returns A promise with the treasury evolution data
   */
  fetchTreasuryEvolution(startDate: Dayjs, numberOfMonths: number): HttpPromise<AnnualTotal> {
    return this.evolutionApi.fetchTreasuryEvolution(formatToIsoDate(startDate), numberOfMonths);
  }

  /**
   * Fetches account monthly totals for a specified year and two preceding years
   *
   * @param year The year for which to retrieve account totals
   * @returns A promise with the yearly account totals data mapped by date
   */
  fetchYearlyAccountTotals(year: number): HttpPromise<YearlyAccountTotalsResponse> {
    return this.evolutionApi.fetchYearlyAccountTotals(year);
  }
}
