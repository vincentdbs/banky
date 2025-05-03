package banky.services.evolution;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;

import banky.db.dao.evolution.EvolutionDao;
import banky.services.transactions.enums.AccountType;
import banky.webservices.api.evolution.responses.AnnualTotalResponse;
import banky.webservices.api.evolution.responses.TotalByAccountAndMonthResponse;
import banky.webservices.api.evolution.responses.TotalByAccountResponse;
import banky.webservices.api.evolution.responses.TotalByCategoryResponse;

/**
 * Test class for the EvolutionService
 */
public class EvolutionServiceTest {

    @Test
    public void testFetchEvolutionTotals() {
        // Mock the DAO
        EvolutionDao evolutionDao = mock(EvolutionDao.class);
        
        // Create test data
        Map<String, TotalByAccountAndMonthResponse> mockData = new HashMap<>();
        
        // Create a sample date
        LocalDate testDate = LocalDate.of(2025, 1, 1);
        String dateKey = testDate.toString();
        
        // Create sample account data
        TotalByAccountResponse account = new TotalByAccountResponse(
            "acc1", "ACC", "Test Account", 1000.0, 100.0, 10.0
        );
        
        // Create sample category data
        TotalByCategoryResponse category = new TotalByCategoryResponse(
            1000.0, 100.0, 10.0, List.of(account)
        );
        
        // Create category map
        Map<AccountType, TotalByCategoryResponse> categoryMap = new HashMap<>();
        categoryMap.put(AccountType.CHECKING, category);
        
        // Create month total
        TotalByAccountAndMonthResponse monthTotal = new TotalByAccountAndMonthResponse(
            1000.0, 100.0, 10.0, categoryMap
        );
        
        mockData.put(dateKey, monthTotal);
        
        // Configure the mock
        when(evolutionDao.fetchEvolutionTotals(testDate, 1)).thenReturn(mockData);
        
        // Create the service with the mock DAO
        EvolutionService evolutionService = new EvolutionService(evolutionDao);
        
        // Execute the method under test
        AnnualTotalResponse result = evolutionService.fetchEvolutionTotals(testDate, 1);
        
        // Verify the results
        assertNotNull("Result should not be null", result);
        assertNotNull("Monthly totals should not be null", result.monthlyTotals());
        assertEquals("There should be one month", 1, result.monthlyTotals().size());
        assertNotNull("The month data should exist", result.monthlyTotals().get(dateKey));
        assertEquals("The total should match", 1000.0, result.monthlyTotals().get(dateKey).total(), 0.001);
        assertEquals("The gain/loss should match", 100.0, result.monthlyTotals().get(dateKey).gainLoss(), 0.001);
        assertEquals("The gain/loss percentage should match", 10.0, result.monthlyTotals().get(dateKey).gainLossPercentage(), 0.001);
    }
}