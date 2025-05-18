package banky.db.dao.evolution.data;

import banky.services.accounts.enums.AccountType;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Data object representing account totals for a specific month.
 * Contains information about account balances at the end of each month,
 * including account details such as name, color, type, and total balance.
 */
public record AccountMonthlyTotal(
    LocalDate month,
    String accountName,
    AccountType accountType,
    BigDecimal total
) {
}
