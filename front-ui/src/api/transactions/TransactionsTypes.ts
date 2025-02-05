export type TransactionResponse =  {
  id: number;
  date: string;
  inBankDate?: string;
  amount: number;
  accountId: number;
  accountName: string;
  accountColor: string;
  categoryId: number;
  categoryName: string;
  subCategoryId: number;
  subCategoryName: string;
  comment?: string;
  tag?: string;
  side: TransactionSide;
  fromToPersonName: string;
}

export type TransactionRequest = {
  date: string;
  inBankDate?: string;
  amount: number;
  accountId: number;
  fromToPersonName: string;
  subCategoryId: number;
  comment?: string;
  tag?: string;
  side: TransactionSide;
}

export enum TransactionSide {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}
