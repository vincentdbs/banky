export type AccountResponse = {
  id: string;
  name: string;
  shortName: string;
  initialAmount: number;
  colorCode: string;
  type: AccountType;
}

export type AccountRequest = {
  name: string;
  shortName: string;
  colorCode: string;
  initialAmount: number;
  type: string;
}

export enum AccountType {
  CHECKING = 'CHECKING',
  SAVINGS = 'SAVINGS',
  MARKET = 'MARKET',
}