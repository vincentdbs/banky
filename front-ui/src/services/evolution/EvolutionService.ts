import EvolutionApi from '@api/evolution/EvolutionApi';
import { MonthlyBudgetResponse } from '@api/evolution/EvolutionTypes';
import { formatToIsoDate } from '@utils/dates/DatesUtils';
import dayjs from 'dayjs';
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
  fetchMonthlyBudget(year: number, month: number): HttpPromise<MonthlyBudgetResponse> {
    const date = dayjs().year(year).month(month).startOf('month');
    return this.evolutionApi.fetchMonthlyBudget(formatToIsoDate(date));
  }
}