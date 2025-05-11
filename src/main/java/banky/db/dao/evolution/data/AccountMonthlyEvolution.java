package banky.db.dao.evolution.data;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Represents monthly account balance evolution with gain/loss analysis.
 * This record holds data returned by the get_account_monthly_evolution SQL function.
 */
public record AccountMonthlyEvolution(
    String accountShortName,
    String accountName,
    Long accountId,
    String accountType,
    LocalDate month,
    BigDecimal totalAmount,
    BigDecimal gainLoss
) {
}
