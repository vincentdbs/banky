package banky.db.dao.evolution.data;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Record to represent an account snapshot for a specific month
 */
public record AccountMonthSnapshot(
    Long accountId,
    String accountName,
    String accountShortName,
    String accountType,
    BigDecimal initialAmount,
    LocalDate snapshotMonth
) {
}
