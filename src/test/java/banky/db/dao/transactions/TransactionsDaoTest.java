package banky.db.dao.transactions;

import banky.db.dao.TransactionsDao;
import banky.guice.TestModule;
import banky.services.transactions.enums.TransactionSide;
import com.coreoz.plume.db.querydsl.transaction.TransactionManagerQuerydsl;
import com.coreoz.test.GuiceTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Test class for the TransactionsDao class.
 * Tests the database access methods for transaction data.
 */
@GuiceTest(TestModule.class)
class TransactionsDaoTest {

    @Inject
    private TransactionsDao transactionsDao;
    
    @Inject
    private TransactionManagerQuerydsl transactionManager;

    @Test
    void testFetchIncomeByMonth__shouldReturnCorrectAmount() {
        // January 2025 - According to the mock data, we have multiple CREDIT transactions:
        // ID 1006: 1000.00
        // ID 1007: 200.50
        // ID 1008: 150.25
        // ID 1009: 300.00
        // ID 1010: 250.75
        // ID 1011: 175.50
        // Total for January: 2077.00
        LocalDate january2025 = LocalDate.of(2025, 1, 1);
        BigDecimal januaryIncome = transactionsDao.fetchIncomeByMonth(january2025);
        assertThat(januaryIncome).isEqualByComparingTo(new BigDecimal("2077.00"));

        // February 2025 - According to the mock data, we have:
        // ID 1012: 225.25
        // ID 1013: 190.00
        // ID 1014: 215.50
        // ID 1015: 280.25
        // ID 1016: 195.75
        // ID 1017: 210.50
        // ID 1022: 152.24 (Livret A interest)
        // Total for February: 1469.49
        LocalDate february2025 = LocalDate.of(2025, 2, 1);
        BigDecimal februaryIncome = transactionsDao.fetchIncomeByMonth(february2025);
        assertThat(februaryIncome).isEqualByComparingTo(new BigDecimal("1469.49"));

        // March 2025 - According to the mock data, we have:
        // ID 1018: 230.00
        // ID 1019: 205.25
        // ID 1020: 270.50
        // Total for March: 705.75
        LocalDate march2025 = LocalDate.of(2025, 3, 1);
        BigDecimal marchIncome = transactionsDao.fetchIncomeByMonth(march2025);
        assertThat(marchIncome).isEqualByComparingTo(new BigDecimal("705.75"));

        // April 2025 - No CREDIT transactions in the mock data
        LocalDate april2025 = LocalDate.of(2025, 4, 1);
        BigDecimal aprilIncome = transactionsDao.fetchIncomeByMonth(april2025);
        assertThat(aprilIncome).isEqualByComparingTo(BigDecimal.ZERO);

        // Test for a month in a different year (no data)
        LocalDate january2024 = LocalDate.of(2024, 1, 1);
        BigDecimal january2024Income = transactionsDao.fetchIncomeByMonth(january2024);
        assertThat(january2024Income).isEqualByComparingTo(BigDecimal.ZERO);
    }
}
