package banky.db.dao.evolution.data;

import java.math.BigDecimal;
import java.sql.BatchUpdateException;
import java.time.LocalDate;

/**
 * Record to represent an account's total for a specific month including all transactions and transfers
 */
public record AccountTotalSnapshot(
    Long accountId,
    String accountName,
    String accountShortName,
    String accountType,
    LocalDate snapshotMonth,
    BigDecimal totalAmount
) {
}
