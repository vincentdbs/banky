package banky.webservices.api.evolution;

import banky.guice.TestModule;
import banky.webservices.api.evolution.responses.AccountMonthlyTotalsResponse;
import com.coreoz.plume.guice.GuiceTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Integration tests for the yearly account totals endpoint
 */
@GuiceTest(TestModule.class)
class AccountMonthlyTotalsIntegrationTest {

    @Inject
    private EvolutionWs evolutionWs;

    @Test
    void getAccountMonthlyTotals_shouldReturnValidResponse() {
        // Act
        AccountMonthlyTotalsResponse response = evolutionWs.fetchAccountMonthlyTotals(2025);

        // Assert
        assertThat(response).isNotNull();
        assertThat(response.monthlyTotals()).isNotNull();
        
        // There should be data for multiple months
        assertThat(response.monthlyTotals().size()).isGreaterThan(0);
        
        // Verify structure of the response
        for (Map.Entry<String, Map<String, BigDecimal>> monthEntry : response.monthlyTotals().entrySet()) {
            // Month entry should be in format "yyyy-MM"
            assertThat(monthEntry.getKey()).matches("\\d{4}-\\d{2}");
            
            // Account totals for the month should not be empty
            Map<String, BigDecimal> accountTotals = monthEntry.getValue();
            assertThat(accountTotals).isNotEmpty();
            
            // Each account should have a valid BigDecimal amount
            for (Map.Entry<String, BigDecimal> accountEntry : accountTotals.entrySet()) {
                assertThat(accountEntry.getKey()).isNotBlank();
                assertThat(accountEntry.getValue()).isNotNull();
            }
        }
    }

    @Test
    void getAccountMonthlyTotals_differentYears_shouldReturnDifferentData() {
        // Act - Get data for two different years
        AccountMonthlyTotalsResponse response2024 = evolutionWs.fetchAccountMonthlyTotals(2024);
        AccountMonthlyTotalsResponse response2025 = evolutionWs.fetchAccountMonthlyTotals(2025);

        // Assert - Both responses should be valid but different
        assertThat(response2024).isNotNull();
        assertThat(response2025).isNotNull();
        
        // Extract the month patterns from both responses
        String[] months2024 = response2024.monthlyTotals().keySet().toArray(new String[0]);
        String[] months2025 = response2025.monthlyTotals().keySet().toArray(new String[0]);
        
        // Verify that the month patterns are different (e.g., "2024-" vs "2025-")
        if (months2024.length > 0 && months2025.length > 0) {
            // We expect months to contain different year prefixes
            assertThat(months2024[0].substring(0, 4)).isNotEqualTo(months2025[0].substring(0, 4));
        }
    }
}
