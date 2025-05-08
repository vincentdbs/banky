import ApiHttpClient from '@api/ApiHttpClient';
import { HttpMethod } from 'simple-http-request-builder';
import { HttpPromise } from 'simple-http-rest-client';
import { PaginatedTickersResponse, TickerRequest } from './TickersTypes';

/**
 * API service for handling tickers operations
 */
export default class TickersApi {
  private readonly BASE_URL: string = '/tickers';

  constructor(private readonly httpClient: ApiHttpClient) {
  }

  /**
   * Fetches tickers with pagination support
   *
   * @param page The page number to retrieve
   * @param size The number of items per page
   * @returns A paginated response containing tickers and pagination metadata
   */
  fetchTickers = (page: number, size: number): HttpPromise<PaginatedTickersResponse> => this
    .httpClient
    .restRequest<PaginatedTickersResponse>(HttpMethod.GET, this.BASE_URL)
    .queryParams(
      [
        ['page', page],
        ['size', size],
      ],
    )
    .execute();

  /**
   * Creates a new ticker
   */
  createTicker(request: TickerRequest): HttpPromise<number> {
    return this
      .httpClient
      .restRequest<number>(HttpMethod.POST, this.BASE_URL)
      .jsonBody(request)
      .execute();
  }
}
