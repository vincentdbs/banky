import { AccountType } from '@api/accounts/AccountsTypes';

export type TotalByAccount = {
  id: string,
  shortName: string,
  name: string,
  total: number,
  gainLoss: number,
  gainLossPercentage: number,
};

export type TotalByCategory = {
  total: number,
  gainLoss: number,
  gainLossPercentage: number,
  totalByAccount: TotalByAccount[],
};

export type TotalByAccountAndMonth = {
  total: number,
  gainLoss: number,
  gainLossPercentage: number,
  totalByCategory: Record<AccountType, TotalByCategory>, // string is the banking account type (CHECKING, SAVINGS, MARKET)
};

export type AnnualTotal = Record<string, TotalByAccountAndMonth>; // string is a local date (YYYY-MM-DD) of the first day of the month for the year

export type YearSummary = {
  total: number,
  gainLoss: number,
  interest: number,
};