import { HttpMethod } from 'simple-http-request-builder';
import { HttpPromise } from 'simple-http-rest-client';
import ApiHttpClient from '@api/ApiHttpClient';
import { TransfertRequest, TransfertResponse } from './TransfertTypes';

/**
 * API service for handling transfers between accounts
 */
export default class TransfertsApi {
  private readonly BASE_URL = '/transferts';

  constructor(private readonly httpClient: ApiHttpClient) {
  }

  /**
   * Fetches all transfers
   */
  fetchTransferts(): HttpPromise<TransfertResponse[]> {
    return this
      .httpClient
      .restRequest<TransfertResponse[]>(HttpMethod.GET, this.BASE_URL)
      .execute();
  }

  /**
   * Creates a new transfer between accounts
   */
  createTransfert(request: TransfertRequest): HttpPromise<number> {
    return this
      .httpClient
      .restRequest<number>(HttpMethod.POST, this.BASE_URL)
      .jsonBody(request)
      .execute();
  }
}