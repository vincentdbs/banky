package banky.db.dao.evolution;

import banky.db.BankyTransactionManager;
import banky.db.dao.accounts.data.AccountMonthlyTotal;
import banky.db.dao.evolution.data.AccountMonthlyEvolution;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import lombok.extern.slf4j.Slf4j;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * DAO responsible for treasury and account evolution data retrieval.
 * Uses custom SQL function to calculate monthly account balances with gain/loss analysis.
 */
@Slf4j
@Singleton
public class TreasuryDao {

    private final BankyTransactionManager transactionManager;

    @Inject
    private TreasuryDao(BankyTransactionManager transactionManager) {
        this.transactionManager = transactionManager;
    }

    /**
     * Fetches monthly account evolution data for the specified period.
     * 
     * @param startDate The start date of the period to analyze
     * @param numberOfMonths The number of months to include in the analysis
     * @return A list of AccountMonthlyEvolution records containing account balances and gain/loss by month
     */
    public List<AccountMonthlyEvolution> fetchAccountsTotalsByMonth(LocalDate startDate, int numberOfMonths) {
        if (startDate == null || numberOfMonths <= 0) {
            return Collections.emptyList();
        }
        
        // Calculate end date based on start date and number of months
        LocalDate endDate = startDate.plusMonths(numberOfMonths).minusDays(1);
        
        String sql = "{CALL get_account_monthly_evolution(?, ?)}";
        List<AccountMonthlyEvolution> results = new ArrayList<>();

        try (Connection connection = transactionManager.dataSource().getConnection();
             PreparedStatement stmt = connection.prepareCall(sql)) {
            
            stmt.setDate(1, java.sql.Date.valueOf(startDate));
            stmt.setDate(2, java.sql.Date.valueOf(endDate));
            
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    AccountMonthlyEvolution evolution = new AccountMonthlyEvolution(
                        rs.getString("account_short_name"),
                        rs.getString("account_name"),
                        rs.getLong("account_id"),
                        rs.getString("account_type"),
                        rs.getDate("month").toLocalDate(),
                        rs.getBigDecimal("total_amount"),
                        rs.getBigDecimal("gain_loss")
                    );
                    results.add(evolution);
                }
            }
            
            return results;
        } catch (SQLException exception) {
            logger.error("Error executing get_account_monthly_evolution function", exception);
            return Collections.emptyList();
        }
    }

    /**
     * Fetches account monthly totals for the specified year and the two preceding years.
     *
     * @param year The year for which to fetch monthly account totals
     * @return A list of AccountMonthlyTotal objects containing account balances by month
     */
    public List<AccountMonthlyTotal> fetchAccountMonthlyTotalsByYear(int year) {
        String procedureCall = "{CALL get_account_monthly_totals_by_year(?)}";
        
        return transactionManager.executeStoredProcedure(
            procedureCall,
            stmt -> stmt.setInt(1, year),
            rs -> new AccountMonthlyTotal(
                // Parse month from the string format (yyyy-MM)
                LocalDate.parse(rs.getString("month")),
                rs.getString("name"),
                rs.getBigDecimal("total")
            )
        );
    }
}
