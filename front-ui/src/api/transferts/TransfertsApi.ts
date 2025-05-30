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

  /**
   * Updates an existing transfert with new data
   *
   * @param transfertId The ID of the transfert to update
   * @param request The updated transfert data
   * @returns A promise that resolves when the update is complete
   */
  updateTransfert(transfertId: string, request: CreateTransfertRequest): HttpPromise<void> {
    return this
      .httpClient
      .restRequest<void>(HttpMethod.PUT, `${this.BASE_URL}/${transfertId}`)
      .jsonBody(request)
      .execute();
  }

  /**
   * Deletes a transfert by its ID
   *
   * @param transfertId The ID of the transfert to delete
   * @returns A promise that resolves when the deletion is complete
   */
  deleteTransfert(transfertId: string): HttpPromise<void> {
    return this
      .httpClient
      .restRequest<void>(HttpMethod.DELETE, `${this.BASE_URL}/${transfertId}`)
      .execute();
  }
}
