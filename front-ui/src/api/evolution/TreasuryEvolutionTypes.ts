import { AccountType } from '@api/accounts/AccountsTypes';

export type TotalByAccount = {
  id: string,
  shortName: string,
  name: string,
  total: string,
  gainLoss: string,
  gainLossPercentage: string,
};

export type TotalByCategory = {
  total: string,
  gainLoss: string,
  gainLossPercentage: string,
  totalByAccount: TotalByAccount[],
};

export type TotalByAccountAndMonth = {
  total: string,
  gainLoss: string,
  gainLossPercentage: string,
  totalByCategory: Record<AccountType, TotalByCategory>,
};

export type AnnualTotal = Record<string, TotalByAccountAndMonth>; // string is a local date (YYYY-MM-DD) of the first day of the month for the year

export type YearSummary = {
  total: number,
  gainLoss: number,
  interest: number,
};
