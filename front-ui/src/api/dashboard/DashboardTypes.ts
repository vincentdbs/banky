// Dashboard API types

/**
 * Dashboard checking account data structure
 */
export type DashboardCheckingAccountResponse = {
  id: number,
  name: string,
  shortName: string,
  colorCode: string,
  totalAmount: string,
  inBankAmount: string,
};

/**
 * Dashboard savings account data structure
 */
export type DashboardSavingAccountResponse = {
  id: number,
  name: string,
  shortName: string,
  colorCode: string,
  totalAmount: string,
  interestAmount: string,
};

/**
 * Dashboard market account data structure
 */
export type DashboardMarketAccountResponse = {
  id: number,
  name: string,
  shortName: string,
  colorCode: string,
  totalAmount: string,
};

/**
 * Combined dashboard accounts response structure
 */
export type DashboardAccountsResponse = {
  checkingAccounts: DashboardCheckingAccountResponse[],
  savingsAccounts: DashboardSavingAccountResponse[],
  marketAccounts: DashboardMarketAccountResponse[],
};