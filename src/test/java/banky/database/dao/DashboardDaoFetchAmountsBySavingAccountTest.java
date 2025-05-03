package banky.database.dao;

import banky.db.dao.DashboardDao;
import banky.guice.TestModule;
import banky.webservices.api.dashboard.data.DashboardSavingAccountResponse;
import banky.webservices.serializer.ThreeDecimalToStringSerializer;
import com.coreoz.test.GuiceTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Test class for DashboardDao methods.
 * Tests the accuracy of dashboard data calculations for different account types.
 */
@GuiceTest(TestModule.class)
public class DashboardDaoFetchAmountsBySavingAccountTest {

    @Inject
    private DashboardDao dashboardDao;

    /**
     * Tests the fetchAmountsBySavingAccount method of DashboardDao.
     * Verifies that:
     * 1. The correct number of saving accounts is returned
     * 2. Account 6 (Livret A) has the correct total amount calculation based on:
     *    - Initial amount
     *    - CREDIT transactions total (including interest)
     *    - DEBIT transactions total
     *    - Incoming transfers total
     *    - Outgoing transfers total
     * 3. The interest amount is correctly calculated based on interest transactions
     */
    @Test
    public void fetchAmountsBySavingAccount__response_must_be_correct() {
        // When fetching saving accounts data
        List<DashboardSavingAccountResponse> savingAccounts = dashboardDao.fetchAmountsBySavingAccount();
        
        // Then all saving accounts should be returned
        assertThat(savingAccounts).hasSize(3); // 3 saving accounts in the test data (Livret A, Livret Jeune, LLDS)
        
        // And account with ID 6 (Livret A) should have correct amounts
        DashboardSavingAccountResponse livretAAccount = savingAccounts.stream()
            .filter(account -> account.id() == 6L)
            .findFirst()
            .orElseThrow(() -> new AssertionError("Livret A account (ID 6) not found"));
        
        // Calculate expected total amount
        BigDecimal expectedTotalAmount = calculateExpectedTotalAmount();
        BigDecimal expectedInterestAmount = calculateExpectedInterestAmount();
        
        // Verify total amount calculation is correct using the string serializer
        assertThat(ThreeDecimalToStringSerializer.convertToString(livretAAccount.totalAmount()))
            .isEqualTo(ThreeDecimalToStringSerializer.convertToString(expectedTotalAmount));
        
        // Verify interest amount calculation
        assertThat(ThreeDecimalToStringSerializer.convertToString(livretAAccount.interestAmount()))
            .isEqualTo(ThreeDecimalToStringSerializer.convertToString(expectedInterestAmount));
        
        // Verify other account properties
        assertThat(livretAAccount.name()).isEqualTo("Livret A");
        assertThat(livretAAccount.shortName()).isEqualTo("LA");
        assertThat(livretAAccount.colorCode()).isEqualTo("1E90FF");
    }
    
    /**
     * Helper method to calculate the expected total amount for Livret A account
     * based on test data.
     * 
     * Total = Initial(500) + CREDIT(interest) - DEBIT(50) + Transfers_in(sum) - Transfers_out(sum)
     */
    private BigDecimal calculateExpectedTotalAmount() {
        // Initial amount for account ID 6 is 500.00
        BigDecimal initialAmount = BigDecimal.valueOf(500L);
        
        // Sum of all CREDIT transactions for account ID 6 (interest of 152.24)
        BigDecimal creditSum = new BigDecimal("152.24");
        
        // Sum of all DEBIT transactions for account ID 6 (one transaction of 50.00)
        BigDecimal debitSum = new BigDecimal("50.00");
        
        // Sum of all incoming transfers to account ID 6 from account ID 1
        // (100.00 + 150.00 + 200.00 + 120.00 + 180.00 + 250.00 = 1000.00)
        BigDecimal transfersIn = new BigDecimal("1000.00");
        
        // Sum of all outgoing transfers from account ID 6 to account ID 1 (one transfer of 75.00)
        BigDecimal transfersOut = new BigDecimal("75.00");
        
        // Calculate total amount
        return initialAmount
            .add(creditSum)
            .subtract(debitSum)
            .add(transfersIn)
            .subtract(transfersOut);
    }
    
    /**
     * Helper method to calculate the expected interest amount for Livret A account
     * based on test data.
     * 
     * Interest amount = Sum of transactions with sub_category_id 27 (Intérêts)
     */
    private BigDecimal calculateExpectedInterestAmount() {
        // One interest transaction of 152.24 for account ID 6
        return new BigDecimal("152.24");
    }
}
