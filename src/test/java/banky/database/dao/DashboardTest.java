package banky.database.dao;

import banky.db.dao.DashboardDao;
import banky.guice.TestModule;
import banky.webservices.api.dashboard.data.DashboardCheckingAccountResponse;
import banky.webservices.serializer.ThreeDecimalToStringSerializer;
import com.coreoz.test.GuiceTest;
import org.junit.jupiter.api.Test;
import jakarta.inject.Inject;

import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Test class for DashboardDao methods.
 * Tests the accuracy of dashboard data calculations for different account types.
 */
@GuiceTest(TestModule.class)
public class DashboardTest {

    @Inject
    private DashboardDao dashboardDao;

    /**
     * Tests the fetchAmountsByCheckingAccount method of DashboardDao.
     * Verifies that:
     * 1. The correct number of checking accounts is returned
     * 2. Account 1 (Crédit Agricole) has the correct total amount calculation based on:
     *    - Initial amount
     *    - CREDIT transactions total
     *    - DEBIT transactions total
     *    - Incoming transfers total
     *    - Outgoing transfers total
     * 3. The in-bank amount is correctly calculated based on reconciled transactions (in_bank_date is not null)
     */
    @Test
    public void fetchAmountsByCheckingAccount__response_must_be_correct() {
        // When fetching checking accounts data
        List<DashboardCheckingAccountResponse> checkingAccounts = dashboardDao.fetchAmountsByCheckingAccount();
        
        // Then all checking accounts should be returned
        assertThat(checkingAccounts).hasSize(5); // 5 checking accounts in the test data
        
        // And account with ID 1 (Crédit Agricole) should have correct amounts
        DashboardCheckingAccountResponse creditAgricoleAccount = checkingAccounts.stream()
            .filter(account -> account.id() == 1L)
            .findFirst()
            .orElseThrow(() -> new AssertionError("Crédit Agricole account (ID 1) not found"));
        
        // Calculate expected total amount
        BigDecimal expectedTotalAmount = calculateExpectedTotalAmount();
        BigDecimal expectedInBankAmount = calculateExpectedInBankAmount();
        
        // Verify total amount calculation is correct using the string serializer
        assertThat(ThreeDecimalToStringSerializer.convertToString(creditAgricoleAccount.totalAmount()))
            .isEqualTo(ThreeDecimalToStringSerializer.convertToString(expectedTotalAmount));
        
        // Verify in-bank amount calculation is correct using the string serializer
        assertThat(ThreeDecimalToStringSerializer.convertToString(creditAgricoleAccount.inBankAmount()))
            .isEqualTo(ThreeDecimalToStringSerializer.convertToString(expectedInBankAmount));
        
        // Verify other account properties
        assertThat(creditAgricoleAccount.name()).isEqualTo("Crédit Agricole");
        assertThat(creditAgricoleAccount.shortName()).isEqualTo("CA");
        assertThat(creditAgricoleAccount.colorCode()).isEqualTo("008A91");
    }
    
    /**
     * Helper method to calculate the expected total amount for Crédit Agricole account
     * based on test data.
     * 
     * Total = Initial(0) + CREDIT(sum) - DEBIT(sum) + Transfers_in(0) - Transfers_out(sum)
     */
    private BigDecimal calculateExpectedTotalAmount() {
        // Initial amount for account ID 1 is 0.00
        BigDecimal initialAmount = BigDecimal.valueOf(1000L);
        
        // Sum of all CREDIT transactions for account ID 1
        BigDecimal creditSum = new BigDecimal("4100.00");  // Sum of 15 CREDIT transactions
        
        // Sum of all DEBIT transactions for account ID 1
        BigDecimal debitSum = new BigDecimal("551.50");    // Sum of 5 DEBIT transactions
        
        // Sum of all outgoing transfers from account ID 1
        BigDecimal transfersOut = new BigDecimal("925.00"); // Sum of 7 transfers (6 to Livret A + 1 from Livret A)
        
        // No incoming transfers to account ID 1 in test data
        BigDecimal transfersIn = BigDecimal.ZERO;
        
        // Calculate total amount
        return initialAmount
            .add(creditSum)
            .subtract(debitSum)
            .add(transfersIn)
            .subtract(transfersOut);
    }

    /**
     * Helper method to calculate the expected in-bank amount for Crédit Agricole account
     * based on reconciled transactions only.
     */
    private BigDecimal calculateExpectedInBankAmount() {
        // Initial amount for account ID 1 is 0.00
        BigDecimal initialAmount = BigDecimal.valueOf(1000L);

        // Sum of all CREDIT transactions for account ID 1
        BigDecimal creditSum = new BigDecimal("3714.00");

        // Sum of all DEBIT transactions for account ID 1
        BigDecimal debitSum = new BigDecimal("351.50");

        // Sum of all outgoing transfers from account ID 1
        BigDecimal transfersOut = new BigDecimal("925.00");

        // No incoming transfers to account ID 1 in test data
        BigDecimal transfersIn = BigDecimal.ZERO;

        // Calculate total amount
        return initialAmount
            .add(creditSum)
            .subtract(debitSum)
            .add(transfersIn)
            .subtract(transfersOut);
    }
}
