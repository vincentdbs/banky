package banky.services.evolution;

import banky.db.dao.evolution.TreasuryBisDao;
import banky.db.dao.evolution.data.AccountMonthlyEvolution;
import banky.services.accounts.enums.AccountType;
import banky.webservices.api.evolution.responses.AnnualTotalResponse;
import banky.webservices.api.evolution.responses.TotalByAccountAndMonthResponse;
import banky.webservices.api.evolution.responses.TotalByCategoryResponse;
import banky.webservices.api.evolution.responses.TotalByAccountResponse;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Service handling business logic for treasury evolution data.
 * Provides methods to fetch and aggregate treasury data over time periods.
 */
@Singleton
public class TreasuryService {
    
    private final TreasuryBisDao treasuryBisDao;

    @Inject
    private TreasuryService(TreasuryBisDao treasuryBisDao) {
        this.treasuryBisDao = treasuryBisDao;
    }
    
    /**
     * Fetches treasury evolution totals for a specified date range.
     * 
     * @param startDate The first month to include in the results (day is ignored)
     * @param numberOfMonths The number of months to fetch from the start date
     * @return AnnualTotalResponse containing monthly totals and account breakdowns
     */
    public AnnualTotalResponse fetchEvolutionTotals(LocalDate startDate, int numberOfMonths) {
        // Normalize the start date to the first day of the month
        LocalDate firstDayOfTheMonth = startDate.withDayOfMonth(1);
        
        // Fetch the data from the DAO
        List<AccountMonthlyEvolution> accountsMonthlyEvolution = treasuryBisDao.fetchAccountsTotalsByMonth(
            firstDayOfTheMonth,
            numberOfMonths
        );

        // Create and return the response object
        return mapToAnnualTotalResponse(accountsMonthlyEvolution);
    }
    
    /**
     * Maps a list of AccountMonthlyEvolution records to an AnnualTotalResponse.
     * The mapping process groups data by month, then by account type, and finally by account.
     * 
     * @param accountsMonthlyEvolution The list of account monthly evolution data from the database
     * @return A structured AnnualTotalResponse for the API
     */
    private AnnualTotalResponse mapToAnnualTotalResponse(List<AccountMonthlyEvolution> accountsMonthlyEvolution) {
        // Map to store data grouped by month
        Map<String, TotalByAccountAndMonthResponse> monthlyTotals = new HashMap<>();
        
        // Group by month
        Map<LocalDate, List<AccountMonthlyEvolution>> byMonth = accountsMonthlyEvolution.stream()
            .collect(Collectors.groupingBy(AccountMonthlyEvolution::month));
        
        // Process each month
        byMonth.forEach((month, monthEvolutions) -> {
            // Calculate total amounts for the month
            BigDecimal monthlyTotal = monthEvolutions.stream()
                .map(AccountMonthlyEvolution::totalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
                
            BigDecimal monthlyGainLoss = monthEvolutions.stream()
                .map(AccountMonthlyEvolution::gainLoss)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
            
            // Calculate gain/loss percentage (avoid division by zero)
            BigDecimal monthlyGainLossPercentage = BigDecimal.ZERO;
            if (monthlyTotal.compareTo(BigDecimal.ZERO) != 0 && monthlyGainLoss.compareTo(BigDecimal.ZERO) != 0) {
                monthlyGainLossPercentage = monthlyGainLoss
                    .divide(monthlyTotal.subtract(monthlyGainLoss), 4, RoundingMode.HALF_UP)
                    .multiply(new BigDecimal("100"));
            }
            
            // Group by account type
            Map<String, List<AccountMonthlyEvolution>> byAccountType = monthEvolutions.stream()
                .collect(Collectors.groupingBy(AccountMonthlyEvolution::accountType));
            
            // Map to store totals by account type
            Map<AccountType, TotalByCategoryResponse> totalByCategory = new HashMap<>();
            
            // Process each account type
            byAccountType.forEach((accountTypeStr, accountTypeEvolutions) -> {
                // Convert string account type to enum
                AccountType accountType = AccountType.valueOf(accountTypeStr);

                // Calculate total amounts for the account type
                BigDecimal categoryTotal = accountTypeEvolutions.stream()
                    .map(AccountMonthlyEvolution::totalAmount)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
                    
                BigDecimal categoryGainLoss = accountTypeEvolutions.stream()
                    .map(AccountMonthlyEvolution::gainLoss)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
                
                // Calculate gain/loss percentage (avoid division by zero)
                BigDecimal categoryGainLossPercentage = BigDecimal.ZERO;
                if (categoryTotal.compareTo(BigDecimal.ZERO) != 0 && categoryGainLoss.compareTo(BigDecimal.ZERO) != 0) {
                    categoryGainLossPercentage = categoryGainLoss
                        .divide(categoryTotal.subtract(categoryGainLoss), 4, RoundingMode.HALF_UP)
                        .multiply(new BigDecimal("100"));
                }
                
                // Create account detail responses
                List<TotalByAccountResponse> totalByAccount = accountTypeEvolutions.stream()
                    .map(account -> {
                        // Calculate account gain/loss percentage (avoid division by zero)
                        BigDecimal accountGainLossPercentage = BigDecimal.ZERO;
                        if (account.totalAmount().compareTo(BigDecimal.ZERO) != 0 && 
                            account.gainLoss().compareTo(BigDecimal.ZERO) != 0) {
                            accountGainLossPercentage = account.gainLoss()
                                .divide(account.totalAmount().subtract(account.gainLoss()), 4, RoundingMode.HALF_UP)
                                .multiply(new BigDecimal("100"));
                        }
                        
                        return new TotalByAccountResponse(
                            String.valueOf(account.accountId()),
                            account.accountShortName(),
                            account.accountName(),
                            account.totalAmount(),
                            account.gainLoss(),
                            accountGainLossPercentage
                        );
                    })
                    .collect(Collectors.toList());
                
                // Create the account type response
                totalByCategory.put(accountType, new TotalByCategoryResponse(
                    categoryTotal,
                    categoryGainLoss,
                    categoryGainLossPercentage,
                    totalByAccount
                ));
            });
            
            // Format the month as a string key (YYYY-MM-DD)
            String monthKey = month.format(DateTimeFormatter.ISO_LOCAL_DATE);
            
            // Create the month response
            monthlyTotals.put(monthKey, new TotalByAccountAndMonthResponse(
                monthlyTotal,
                monthlyGainLoss,
                monthlyGainLossPercentage,
                totalByCategory
            ));
        });
        
        return new AnnualTotalResponse(monthlyTotals);
    }
}