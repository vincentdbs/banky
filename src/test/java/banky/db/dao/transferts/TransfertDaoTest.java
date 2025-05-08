package banky.db.dao.transferts;

import banky.db.dao.TransfertDao;
import banky.db.generated.QTransfert;
import banky.db.generated.Transfert;
import banky.guice.TestModule;
import banky.webservices.api.transfert.responses.TransfertResponse;
import com.coreoz.plume.db.querydsl.transaction.TransactionManagerQuerydsl;
import com.coreoz.test.GuiceTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Integration tests for TransfertDao using the existing mock data from database migrations
 */
@GuiceTest(TestModule.class)
class TransfertDaoTest {

    @Inject
    private TransfertDao transfertDao;

    @Inject
    private TransactionManagerQuerydsl transactionManager;

    @Test
    void fetchTransfertsPaginated_shouldReturnPagedTransfertsWithAccountDetails() {
        // Act
        List<TransfertResponse> transferts = transfertDao.fetchTransfertsPaginated(1, 10);

        // Assert
        assertThat(transferts).isNotEmpty();
        assertThat(transferts.size()).isLessThanOrEqualTo(10); // Should not exceed page size

        // Verify all transfers have the expected data structure
        for (TransfertResponse transfert : transferts) {
            assertThat(transfert.id()).isNotNull();
            assertThat(transfert.fromAccountId()).isNotNull();
            assertThat(transfert.fromAccountName()).isNotNull();
            assertThat(transfert.toAccountId()).isNotNull();
            assertThat(transfert.toAccountName()).isNotNull();
            assertThat(transfert.amount()).isNotNull();
            assertThat(transfert.date()).isNotNull();
        }

        // Find a specific transfer from the mock data (id: 101)
        Optional<TransfertResponse> specificTransfert = transferts.stream()
            .filter(t -> t.id() == 101L)
            .findFirst();

        if (specificTransfert.isPresent()) {
            TransfertResponse transfert = specificTransfert.get();
            assertThat(transfert.fromAccountId()).isEqualTo(1L); // Crédit Agricole
            assertThat(transfert.toAccountId()).isEqualTo(6L); // Livret A
            assertThat(transfert.amount()).isEqualByComparingTo(new BigDecimal("100.00"));
            assertThat(transfert.date()).isEqualTo(LocalDate.of(2025, 1, 5));
            assertThat(transfert.fromAccountName()).isEqualTo("Crédit Agricole");
            assertThat(transfert.toAccountName()).isEqualTo("Livret A");
        }
    }

    @Test
    void fetchTransfertsPaginated_shouldRespectPaginationParameters() {
        // Act - Request first page with 3 items
        List<TransfertResponse> firstPage = transfertDao.fetchTransfertsPaginated(1, 3);
        // Act - Request second page with 3 items
        List<TransfertResponse> secondPage = transfertDao.fetchTransfertsPaginated(2, 3);

        // Assert
        assertThat(firstPage).isNotEmpty();
        assertThat(firstPage.size()).isLessThanOrEqualTo(3); // Should not exceed page size
        
        if (!secondPage.isEmpty()) {
            // If we have enough data for a second page
            assertThat(secondPage.size()).isLessThanOrEqualTo(3);
            // First and second page should contain different items
            assertThat(firstPage.get(0).id()).isNotEqualTo(secondPage.get(0).id());
        }
    }

    @Test
    void countTransferts_shouldReturnTotalCount() {
        // Act
        long count = transfertDao.countTransferts();

        // Assert
        assertThat(count).isGreaterThanOrEqualTo(7); // There are at least 7 transfer records in the mock data
    }

    @Test
    void save_shouldCreateNewTransfert() {
        // Arrange
        Long fromAccountId = 1L; // Crédit Agricole
        Long toAccountId = 6L; // Livret A
        BigDecimal amount = new BigDecimal("250.50");
        LocalDate date = LocalDate.now();

        Transfert transfert = new Transfert();
        transfert.setFromAccountId(fromAccountId);
        transfert.setToAccountId(toAccountId);
        transfert.setAmount(amount);
        transfert.setDate(date);

        // Act
        Transfert savedTransfert = transfertDao.save(transfert);

        // Assert
        assertThat(savedTransfert.getId()).isNotNull();

        // Verify the transfert was properly saved by querying it
        Transfert retrievedTransfert = transactionManager
            .selectQuery()
            .select(QTransfert.transfert)
            .from(QTransfert.transfert)
            .where(QTransfert.transfert.id.eq(savedTransfert.getId()))
            .fetchOne();

        assertThat(retrievedTransfert).isNotNull();
        assertThat(retrievedTransfert.getFromAccountId()).isEqualTo(fromAccountId);
        assertThat(retrievedTransfert.getToAccountId()).isEqualTo(toAccountId);
        assertThat(retrievedTransfert.getAmount()).isEqualByComparingTo(amount);
        assertThat(retrievedTransfert.getDate()).isEqualTo(date);

        // Clean up test data
        transactionManager
            .delete(QTransfert.transfert)
            .where(QTransfert.transfert.id.eq(savedTransfert.getId()))
            .execute();
    }

    @Test
    void fetchSavingsAmountByMonth_shouldCalculateJanuarySavings() {
        // Arrange - January 2025
        LocalDate january2025 = LocalDate.of(2025, 1, 1);
        
        // Act
        BigDecimal savingsAmount = transfertDao.fetchSavingsAmountByMonth(january2025);
        
        // Assert
        // In January we have transfers with IDs 101, 102, 103 to Livret A (account 6)
        // Amounts: 100.00 + 150.00 + 200.00 = 450.00
        assertThat(savingsAmount).isEqualByComparingTo(new BigDecimal("450.00"));
    }
    
    @Test
    void fetchSavingsAmountByMonth_shouldCalculateFebruarySavings() {
        // Arrange - February 2025
        LocalDate february2025 = LocalDate.of(2025, 2, 1);
        
        // Act
        BigDecimal savingsAmount = transfertDao.fetchSavingsAmountByMonth(february2025);
        
        // Assert
        // In February we have transfers:
        // ID 104: CA to Livret A: 120.00
        // ID 105: CA to Livret A: 180.00
        // ID 106: CA to Livret A: 250.00
        // ID 107: Livret A to CA: -75.00 (this is from savings to checking, so should not be counted)
        // Net inflows to savings: 120.00 + 180.00 + 250.00 = 550.00
        assertThat(savingsAmount).isEqualByComparingTo(new BigDecimal("550.00"));
    }
    
    @Test
    void fetchSavingsAmountByMonth_shouldReturnZeroForMonthWithNoSavingsTransfers() {
        // Arrange - April 2025 (no transfers in mock data)
        LocalDate april2025 = LocalDate.of(2025, 4, 1);
        
        // Act
        BigDecimal savingsAmount = transfertDao.fetchSavingsAmountByMonth(april2025);
        
        // Assert
        assertThat(savingsAmount).isEqualByComparingTo(BigDecimal.ZERO);
    }
    
    @Test
    void fetchSavingsAmountByMonth_shouldOnlyCountTransfersToSavingsAccounts() {
        // We'll add a test transfer between two checking accounts and verify it's not counted
        // Arrange
        LocalDate testDate = LocalDate.of(2025, 3, 1);
        
        // Create a transfer between two checking accounts (from CA to Fortuneo)
        Transfert checkingTransfer = new Transfert();
        checkingTransfer.setFromAccountId(1L); // Credit Agricole (CHECKING)
        checkingTransfer.setToAccountId(5L);   // Fortuneo (CHECKING)
        checkingTransfer.setAmount(new BigDecimal("300.00"));
        checkingTransfer.setDate(testDate);
        Transfert savedCheckingTransfer = transfertDao.save(checkingTransfer);
        
        // Create a transfer to a savings account for the same month
        Transfert savingsTransfer = new Transfert();
        savingsTransfer.setFromAccountId(1L);  // Credit Agricole (CHECKING)
        savingsTransfer.setToAccountId(6L);    // Livret A (SAVINGS)
        savingsTransfer.setAmount(new BigDecimal("200.00"));
        savingsTransfer.setDate(testDate);
        Transfert savedSavingsTransfer = transfertDao.save(savingsTransfer);
        
        // Act
        BigDecimal savingsAmount = transfertDao.fetchSavingsAmountByMonth(testDate);
        
        // Assert
        // Should only count the transfer to the savings account (200.00)
        assertThat(savingsAmount).isEqualByComparingTo(new BigDecimal("200.00"));
        
        // Clean up test data
        transactionManager
            .delete(QTransfert.transfert)
            .where(QTransfert.transfert.id.in(savedCheckingTransfer.getId(), savedSavingsTransfer.getId()))
            .execute();
    }
}