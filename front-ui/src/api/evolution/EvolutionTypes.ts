/**
 * Types for the evolution API responses
 * Contains types related to monthly budgets
 */

/**
 * Category data for monthly budget
 */
export type MonthlyBudgetCategory = {
  name: string,
  spent: string,
  budgeted: string,
  spentPercentageOfBudgeted: string,
  spentPercentageOfTotal: string,
};

/**
 * Monthly budget data returned by the API
 */
export type MonthlyBudgetResponse = {
  total: string,
  budgetedTotal: string,
  spentPercentageOfBudgeted: string,
  spentPercentageOfTotal: string,
  totalWithoutSavings: string,
  budgetedTotalWithoutSavings: string,
  spentWithoutSavingsPercentage: string,
  budgetedWithoutSavingsPercentage: string,
  categories: MonthlyBudgetCategory[],
  balance: string,
  balanceWithoutSavings: string,
  orderCharges: string,
  savings: string,
  budgetedSavings: string,
};
