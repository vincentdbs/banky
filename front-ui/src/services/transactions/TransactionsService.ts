import TransactionsApi from '@api/transactions/TransactionsApi';
import {
  CreateTransactionRequest,
  PaginatedTransactionsResponse,
} from '@api/transactions/TransactionsTypes';
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
  fetchTransactions = (page: number, size: number): HttpPromise<PaginatedTransactionsResponse> => this.transactionsApi.fetchTransactions(page, size);

  createTransaction(request: CreateTransactionRequest): HttpPromise<number> {
    return this.transactionsApi.createTransaction(request);
  }

  updateTransaction(id: string, request: CreateTransactionRequest): HttpPromise<void> {
    return this.transactionsApi.updateTransaction(id, request);
  }

  /**
   * Delete a transaction by its ID
   *
   * @param id The ID of the transaction to delete
   * @returns A promise that resolves when the transaction is deleted
   */
  deleteTransaction(id: string): HttpPromise<void> {
    return this.transactionsApi.deleteTransaction(id);
  }
}
