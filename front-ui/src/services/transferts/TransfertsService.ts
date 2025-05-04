import { getGlobalInstance } from 'plume-ts-di';
import TransfertsApi from '@api/transferts/TransfertsApi';
import { TransfertRequest, TransfertResponse } from '@api/transferts/TransfertTypes';
import { HttpPromise } from 'simple-http-rest-client';

/**
 * TransfertsService handles all business logic for transferts between accounts.
 * It provides methods for fetching transfers and creating new ones.
 */
export default class TransfertsService {
  constructor(private readonly transfertsApi: TransfertsApi) {
  }

  /**
   * Fetches all transfers between accounts
   */
  fetchTransferts(): HttpPromise<TransfertResponse[]> {
    return this.transfertsApi.fetchTransferts();
  }

  /**
   * Creates a new transfer between accounts
   */
  createTransfert(request: TransfertRequest): HttpPromise<number> {
    return this.transfertsApi.createTransfert(request);
  }
}