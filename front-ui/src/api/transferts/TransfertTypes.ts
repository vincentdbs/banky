import { PaginatedResponse } from '@/utils/types/PaginationTypes';

/**
 * Types for transfert API interactions
 */
export type TransfertResponse = {
  id: number,
  fromAccountId: number,
  fromAccountName: string,
  fromAccountColor: string,
  toAccountId: number,
  toAccountName: string,
  toAccountColor: string,
  amount: string, // 123.465 => 123465
  date: string,
};

export type TransfertRequest = {
  fromAccountId: string,
  toAccountId: string,
  amount: number,
  date: string,
};

/**
 * Type for paginated transfert responses
 */
export type PaginatedTransfertsResponse = PaginatedResponse<TransfertResponse>;