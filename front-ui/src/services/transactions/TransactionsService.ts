import TransactionsApi from '@api/transactions/TransactionsApi';
import { TransactionRequest, TransactionResponse } from '@api/transactions/TransactionsTypes';
import { HttpPromise } from 'simple-http-rest-client';

export default class TransactionsService {
  constructor(private readonly transactionsApi: TransactionsApi) {
  }

  fetchTransactions(page: number, size: number): HttpPromise<TransactionResponse[]> {
    return this.transactionsApi.fetchTransactions(page, size);
  }

  createTransaction(request: TransactionRequest): HttpPromise<number> {
    return this.transactionsApi.createTransaction(request);
  }

  updateTransaction(id: string, request: TransactionRequest): HttpPromise<void> {
    return this.transactionsApi.updateTransaction(id, request);
  }
}
