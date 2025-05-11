package banky.services.evolution;

import banky.db.dao.accounts.data.AccountMonthlyTotal;
import banky.db.dao.evolution.TreasuryDao;
import banky.webservices.api.evolution.responses.AmountByAccountResponse;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Service responsible for retrieving and organizing account amounts by month.
 * Provides methods to fetch and transform account totals for reporting and analysis.
 */
@Slf4j
@Singleton
public class AmountByAccountService {

    private final TreasuryDao treasuryDao;

    @Inject
    private AmountByAccountService(TreasuryDao treasuryDao) {
        this.treasuryDao = treasuryDao;
    }

    /**
     * Fetches account monthly totals for the specified year and organizes them by month.
     *
     * @param year The year for which to fetch account totals
     * @return A map of monthly dates to account amounts
     */
    public Map<LocalDate, List<AmountByAccountResponse>> fetchAccountTotalsByYear(int year) {
        List<AccountMonthlyTotal> monthlyTotals = treasuryDao.fetchAccountMonthlyTotalsByYear(year);

        // Group by month and map to response objects
        return monthlyTotals
            .stream()
            .collect(
                Collectors.groupingBy(
                    AccountMonthlyTotal::month,
                    Collectors.mapping(
                        total -> new AmountByAccountResponse(total.accountName(), total.total()),
                        Collectors.toList()
                    )
                )
            );
    }
}
