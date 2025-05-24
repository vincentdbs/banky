import TransfertsApi from '@api/transferts/TransfertsApi';
import { PaginatedTransfertsResponse, CreateTransfertRequest } from '@api/transferts/TransfertTypes';
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
  createTransfert(request: CreateTransfertRequest): HttpPromise<number> {
    return this.transfertsApi.createTransfert(request);
  }

  /**
   * Updates an existing transfert with new data
   *
   * @param transfertId The ID of the transfert to update
   * @param request The updated transfert data
   * @returns A promise that resolves when the update is complete
   */
  updateTransfert(transfertId: string, request: CreateTransfertRequest): HttpPromise<void> {
    return this.transfertsApi.updateTransfert(transfertId, request);
  }

  /**
   * Deletes a transfert by its ID
   *
   * @param transfertId The ID of the transfert to delete
   * @returns A promise that resolves when the deletion is complete
   */
  deleteTransfert(transfertId: string): HttpPromise<void> {
    return this.transfertsApi.deleteTransfert(transfertId);
  }
}
