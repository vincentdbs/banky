package banky.db.dao.accounts.data;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Data object representing account totals for a specific month.
 * Contains information about account balances at the end of each month.
 */
public record AccountMonthlyTotal(
    LocalDate month,
    String accountName,
    BigDecimal total
) {
}
