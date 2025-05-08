import TickersApi from '@api/tickers/TickersApi';
import { PaginatedTickersResponse, TickerRequest } from '@api/tickers/TickersTypes';
import { HttpPromise } from 'simple-http-rest-client';

/**
 * TickersService handles all business logic for tickers.
 * It provides methods for fetching tickers and creating new ones.
 */
export default class TickersService {
  constructor(private readonly tickersApi: TickersApi) {
  }

  /**
   * Fetches tickers with pagination support
   *
   * @param page The page number (1-based)
   * @param size The number of items per page
   * @returns A promise containing the paginated ticker response
   */
  fetchTickers = (page: number, size: number): HttpPromise<PaginatedTickersResponse> => this.tickersApi.fetchTickers(page, size);

  /**
   * Creates a new ticker
   *
   * @param request The ticker details
   * @returns A promise containing the ID of the created ticker
   */
  createTicker(request: TickerRequest): HttpPromise<number> {
    return this.tickersApi.createTicker(request);
  }
}
