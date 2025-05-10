package banky.services.evolution;

import banky.db.dao.evolution.EvolutionDao;
import banky.webservices.api.evolution.responses.AnnualTotalResponse;
import banky.webservices.api.evolution.responses.TotalByAccountAndMonthResponse;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import java.time.LocalDate;
import java.util.Map;

/**
 * Service handling business logic for treasury evolution data.
 * Provides methods to fetch and aggregate treasury data over time periods.
 */
@Singleton
public class TreasuryService {
    
    private final EvolutionDao evolutionDao;
    
    @Inject
    private TreasuryService(EvolutionDao evolutionDao) {
        this.evolutionDao = evolutionDao;
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
        Map<String, TotalByAccountAndMonthResponse> monthlyTotals = evolutionDao.fetchEvolutionTotals(
            firstDayOfTheMonth,
            numberOfMonths
        );
        
        // Create and return the response object
        return new AnnualTotalResponse(monthlyTotals);
    }
}