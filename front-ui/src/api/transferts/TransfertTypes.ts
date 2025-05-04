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