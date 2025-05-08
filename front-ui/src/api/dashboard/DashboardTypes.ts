// Dashboard API types

/**
 * Dashboard checking account data structure
 */
export type DashboardCheckingAccountResponse = {
  id: number,
  name: string,
  shortName: string,
  colorCode: string,
  totalAmount: string, // 1123.320 => 1123320
  inBankAmount: string, // 1123.320 => 1123320
};

/**
 * Dashboard savings account data structure
 */
export type DashboardSavingAccountResponse = {
  id: number,
  name: string,
  shortName: string,
  colorCode: string,
  totalAmount: string, // 1123.320 => 1123320
  interestAmount: string, // 1123.320 => 1123320
};

/**
 * Dashboard market account data structure
 */
export type DashboardMarketAccountResponse = {
  id: number,
  name: string,
  shortName: string,
  colorCode: string,
  totalAmount: string, // 1123.320 => 1123320
};

/**
 * Combined dashboard accounts response structure
 */
export type DashboardAccountsResponse = {
  checkingAccounts: DashboardCheckingAccountResponse[],
  savingsAccounts: DashboardSavingAccountResponse[],
  marketAccounts: DashboardMarketAccountResponse[],
};
