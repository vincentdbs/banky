import EvolutionApi from '@api/evolution/EvolutionApi';
import { MonthlyBudgetResponse } from '@api/evolution/EvolutionTypes';
import { HttpPromise } from 'simple-http-rest-client';

/**
 * Service for handling evolution data and operations
 * Provides methods to fetch and process monthly budget data
 */
export default class EvolutionService {
  constructor(private evolutionApi: EvolutionApi) {}

  /**
   * Fetches the monthly budget data
   * 
   * @returns A promise with the monthly budget data
   */
  fetchMonthlyBudget(): HttpPromise<MonthlyBudgetResponse> {
    return this.evolutionApi.fetchMonthlyBudget();
  }
}