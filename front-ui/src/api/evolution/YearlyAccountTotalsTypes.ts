/**
 * Amount by account data returned by the API
 */
export type AmountByAccountResponse = {
  accountName: string,
  amount: string,
};

/**
 * Yearly account totals response type
 * Maps LocalDate to a list of account amounts
 */
export type YearlyAccountTotalsResponse = Record<string, AmountByAccountResponse[]>;
