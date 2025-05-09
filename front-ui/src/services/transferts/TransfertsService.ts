import TransfertsApi from '@api/transferts/TransfertsApi';
import { PaginatedTransfertsResponse, TransfertRequest } from '@api/transferts/TransfertTypes';
import { HttpPromise } from 'simple-http-rest-client';

/**
 * TransfertsService handles all business logic for transferts between accounts.
 * It provides methods for fetching transfers and creating new ones.
 */
export default class TransfertsService {
  constructor(private readonly transfertsApi: TransfertsApi) {
  }

  /**
   * Fetches transfers with pagination support
   *
   * @param page The page number (1-based)
   * @param size The number of items per page
   * @returns A promise containing the paginated transfert response
   */
  fetchTransferts = (page: number, size: number): HttpPromise<PaginatedTransfertsResponse> => this.transfertsApi.fetchTransferts(page, size);

  /**
   * Creates a new transfer between accounts
   */
  createTransfert(request: TransfertRequest): HttpPromise<number> {
    return this.transfertsApi.createTransfert(request);
  }
}
