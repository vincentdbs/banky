import EvolutionApi from '@api/evolution/EvolutionApi';
import { MonthlyBudgetResponse } from '@api/evolution/EvolutionTypes';
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
}
