import { PaginatedResponse } from '@/utils/types/PaginationTypes';

export type TransactionResponse = {
  id: number,
  date: string,
  inBankDate?: string,
  amount: number,
  accountId: number,
  accountName: string,
  accountColor: string,
  categoryId: number,
  categoryName: string,
  subCategoryId: number,
  subCategoryName: string,
  comment?: string,
  tag?: string,
  side: TransactionSide,
  fromToPersonName: string,
};

export type PaginatedTransactionsResponse = PaginatedResponse<TransactionResponse>;

export type TransactionRequest = {
  date: string,
  inBankDate?: string,
  amount: number,
  accountId: string,
  fromToPersonName: string,
  subCategoryId: string,
  comment?: string,
  tag?: string,
  side: TransactionSide,
};

export enum TransactionSide {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}
