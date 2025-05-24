import { PaginatedResponse } from '@/utils/types/PaginationTypes';

/**
 * Types for transfert API interactions
 */
export type TransfertResponse = {
  id: string,
  fromAccountId: string,
  fromAccountName: string,
  fromAccountColor: string,
  toAccountId: string,
  toAccountName: string,
  toAccountColor: string,
  amount: string, // 123.465 => 123465
  date: string,
};

export type CreateTransfertRequest = {
  fromAccountId: string,
  toAccountId: string,
  amount: string,
  date: string,
};

/**
 * Type for paginated transfert responses
 */
export type PaginatedTransfertsResponse = PaginatedResponse<TransfertResponse>;
