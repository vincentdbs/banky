import TransactionsApi from '@api/transactions/TransactionsApi';
import { PaginatedTransactionsResponse, TransactionRequest, TransactionResponse } from '@api/transactions/TransactionsTypes';
import { HttpPromise } from 'simple-http-rest-client';

/**
 * Service for transaction-related operations including fetching with pagination,
 * creating, and updating transactions.
 */
export default class TransactionsService {
  constructor(private readonly transactionsApi: TransactionsApi) {
  }

  /**
   * Fetch transactions with pagination support.
   * 
   * @param page The page number (1-based)
   * @param size The number of items per page
   * @returns A promise containing the paginated transaction response
   */
  fetchTransactions = (page: number, size: number): HttpPromise<PaginatedTransactionsResponse> => {
    return this.transactionsApi.fetchTransactions(page, size);
  };

  createTransaction(request: TransactionRequest): HttpPromise<number> {
    return this.transactionsApi.createTransaction(request);
  }

  updateTransaction(id: string, request: TransactionRequest): HttpPromise<void> {
    return this.transactionsApi.updateTransaction(id, request);
  }
}
