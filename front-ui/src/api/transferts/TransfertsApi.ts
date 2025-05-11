import ApiHttpClient from '@api/ApiHttpClient';
import { HttpMethod } from 'simple-http-request-builder';
import { HttpPromise } from 'simple-http-rest-client';
import { PaginatedTransfertsResponse, CreateTransfertRequest } from './TransfertTypes';

/**
 * API service for handling transfers between accounts
 */
export default class TransfertsApi {
  private readonly BASE_URL: string = '/transferts';

  constructor(private readonly httpClient: ApiHttpClient) {
  }

  /**
   * Fetches transfers with pagination support
   *
   * @param page The page number to retrieve
   * @param size The number of items per page
   * @returns A paginated response containing transfers and pagination metadata
   */
  fetchTransferts = (page: number, size: number): HttpPromise<PaginatedTransfertsResponse> => this
    .httpClient
    .restRequest<PaginatedTransfertsResponse>(HttpMethod.GET, this.BASE_URL)
    .queryParams(
      [
        ['page', page],
        ['size', size],
      ],
    )
    .execute();

  /**
   * Creates a new transfer between accounts
   */
  createTransfert(request: CreateTransfertRequest): HttpPromise<number> {
    return this
      .httpClient
      .restRequest<number>(HttpMethod.POST, this.BASE_URL)
      .jsonBody(request)
      .execute();
  }
}
