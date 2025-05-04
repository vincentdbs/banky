package banky.db.dao.evolution.data;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Record representing the final evolution report result with account details,
 * total amount and month-over-month gain/loss calculations
 */
public record EvolutionResult(
    String accountShortName,
    String accountName,
    Long accountId,
    String accountType,
    LocalDate month,
    BigDecimal totalAmount,
    BigDecimal gainLoss
) {
}
