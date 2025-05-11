package banky.services.evolution;

import banky.db.dao.accounts.data.AccountMonthlyTotal;
import banky.db.dao.evolution.TreasuryDao;
import banky.webservices.api.evolution.responses.AmountByAccountResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

/**
 * Unit tests for AmountByAccountService class
 */
@ExtendWith(MockitoExtension.class)
class AmountByAccountResponseServiceTest {
    
    @Mock
    private TreasuryDao treasuryDao;
    
    private AmountByAccountService amountByAccountService;

    @BeforeEach
    void setUp() {
        amountByAccountService = new AmountByAccountService(treasuryDao);
    }

    @Test
    void getAccountTotalsByYear_shouldOrganizeTotalsByMonth() {
        // Arrange
        int year = 2025;
        LocalDate januaryDate = LocalDate.of(2025, 1, 1);
        LocalDate februaryDate = LocalDate.of(2025, 2, 1);
        
        // Create test data for multiple months and accounts
        List<AccountMonthlyTotal> testData = Arrays.asList(
            new AccountMonthlyTotal(januaryDate, "Checking", new BigDecimal("1000.00")),
            new AccountMonthlyTotal(januaryDate, "Savings", new BigDecimal("5000.00")),
            new AccountMonthlyTotal(februaryDate, "Checking", new BigDecimal("1200.00")),
            new AccountMonthlyTotal(februaryDate, "Savings", new BigDecimal("5200.00"))
        );
        
        when(treasuryDao.fetchAccountMonthlyTotalsByYear(year)).thenReturn(testData);
        
        // Act
        Map<LocalDate, AmountByAccountResponse> result = amountByAccountService.fetchAccountTotalsByYear(year);
        
        // Assert
        assertThat(result).hasSize(2); // Two months of data
        assertThat(result).containsKeys(januaryDate, februaryDate);
        
        // Verify January data
        AmountByAccountResponse januaryAmounts = result.get(januaryDate);
        assertThat(januaryAmounts.accountAmounts()).hasSize(2);
        assertThat(januaryAmounts.accountAmounts().get("Checking")).isEqualByComparingTo("1000.00");
        assertThat(januaryAmounts.accountAmounts().get("Savings")).isEqualByComparingTo("5000.00");
        
        // Verify February data
        AmountByAccountResponse februaryAmounts = result.get(februaryDate);
        assertThat(februaryAmounts.accountAmounts()).hasSize(2);
        assertThat(februaryAmounts.accountAmounts().get("Checking")).isEqualByComparingTo("1200.00");
        assertThat(februaryAmounts.accountAmounts().get("Savings")).isEqualByComparingTo("5200.00");
    }

    @Test
    void getAccountTotalsByYearFormatted_shouldReturnFormattedMonthsAndValues() {
        // Arrange
        int year = 2025;
        LocalDate januaryDate = LocalDate.of(2025, 1, 1);
        LocalDate februaryDate = LocalDate.of(2025, 2, 1);
        
        List<AccountMonthlyTotal> testData = Arrays.asList(
            new AccountMonthlyTotal(januaryDate, "Checking", new BigDecimal("1000.00")),
            new AccountMonthlyTotal(januaryDate, "Savings", new BigDecimal("5000.00")),
            new AccountMonthlyTotal(februaryDate, "Checking", new BigDecimal("1200.00")),
            new AccountMonthlyTotal(februaryDate, "Savings", new BigDecimal("5200.00"))
        );
        
        when(treasuryDao.fetchAccountMonthlyTotalsByYear(year)).thenReturn(testData);
        
        // Act
        Map<String, Map<String, BigDecimal>> result = amountByAccountService.getAccountTotalsByYearFormatted(year);
        
        // Assert
        assertThat(result).hasSize(2);
        assertThat(result).containsKeys("2025-01", "2025-02");
        
        // Verify January data formatted properly
        Map<String, BigDecimal> januaryData = result.get("2025-01");
        assertThat(januaryData).hasSize(2);
        assertThat(januaryData.get("Checking")).isEqualByComparingTo("1000.00");
        assertThat(januaryData.get("Savings")).isEqualByComparingTo("5000.00");
        
        // Verify February data formatted properly
        Map<String, BigDecimal> februaryData = result.get("2025-02");
        assertThat(februaryData).hasSize(2);
        assertThat(februaryData.get("Checking")).isEqualByComparingTo("1200.00");
        assertThat(februaryData.get("Savings")).isEqualByComparingTo("5200.00");
    }
}
