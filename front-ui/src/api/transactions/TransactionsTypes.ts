import { PaginatedResponse } from '@/utils/types/PaginationTypes';

export type TransactionResponse = {
  id: string,
  date: string,
  inBankDate?: string,
  amount: number,
  accountId: string,
  accountName: string,
  accountColor: string,
  categoryId: number,
  categoryName: string,
  subCategoryId: string,
  subCategoryName: string,
  comment?: string,
  tag?: string,
  side: TransactionSide,
  fromToPersonName: string,
};

export type PaginatedTransactionsResponse = PaginatedResponse<TransactionResponse>;

export type CreateTransactionRequest = {
  date: string,
  inBankDate?: string,
  amount: string,
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
