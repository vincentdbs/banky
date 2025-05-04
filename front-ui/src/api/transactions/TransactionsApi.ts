import ApiHttpClient from '@api/ApiHttpClient';
import { HttpMethod } from 'simple-http-request-builder';
import { HttpPromise } from 'simple-http-rest-client';
import { PaginatedTransactionsResponse, TransactionRequest, TransactionResponse } from './TransactionsTypes';

export default class TransactionsApi {
  private static BASE_PATH: string = '/transactions';

  constructor(private apiHttpClient: ApiHttpClient) {}

  fetchTransactions(page: number, size: number): HttpPromise<PaginatedTransactionsResponse> {
    return this.apiHttpClient
      .restRequest<PaginatedTransactionsResponse>(HttpMethod.GET, TransactionsApi.BASE_PATH)
      .queryParams(
        [
          ['page', page],
          ['size', size],
        ],
      )
      .execute();
  }

  createTransaction(request: TransactionRequest): HttpPromise<number> {
    return this.apiHttpClient
      .restRequest<number>(HttpMethod.POST, TransactionsApi.BASE_PATH)
      .jsonBody(request)
      .execute();
  }

  updateTransaction(id: string, request: TransactionRequest): HttpPromise<void> {
    return this.apiHttpClient
      .restRequest<void>(HttpMethod.PUT, `${TransactionsApi.BASE_PATH}/${id}`)
      .jsonBody(request)
      .execute();
  }
}
