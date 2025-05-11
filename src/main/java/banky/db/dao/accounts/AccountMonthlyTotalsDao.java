package banky.db.dao.accounts;

import banky.db.BankyTransactionManager;
import banky.db.dao.accounts.data.AccountMonthlyTotal;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import lombok.extern.slf4j.Slf4j;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.List;

/**
 * Data Access Object responsible for retrieving monthly account totals.
 * Uses stored procedures to efficiently calculate account balances for specified years.
 */
@Slf4j
@Singleton
public class AccountMonthlyTotalsDao {

    private final BankyTransactionManager transactionManager;
    private static final DateTimeFormatter MONTH_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM");

    @Inject
    public AccountMonthlyTotalsDao(BankyTransactionManager transactionManager) {
        this.transactionManager = transactionManager;
    }

    /**
     * Fetches account monthly totals for the specified year and the two preceding years.
     *
     * @param year The year for which to fetch monthly account totals
     * @return A list of AccountMonthlyTotal objects containing account balances by month
     */
    public List<AccountMonthlyTotal> getAccountMonthlyTotalsByYear(int year) {
        String procedureCall = "{CALL get_account_monthly_totals_by_year(?)}";
        
        return transactionManager.executeStoredProcedure(
            procedureCall,
            stmt -> stmt.setInt(1, year),
            rs -> new AccountMonthlyTotal(
                // Parse month from the string format (yyyy-MM)
                YearMonth.parse(rs.getString("month"), MONTH_FORMATTER).atDay(1),
                rs.getString("name"),
                rs.getBigDecimal("total")
            )
        );
    }
}
