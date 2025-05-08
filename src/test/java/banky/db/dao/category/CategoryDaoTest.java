package banky.db.dao.category;

import banky.db.dao.TransactionsDao;
import banky.db.dao.category.data.SpentByCategory;
import banky.guice.TestModule;
import com.coreoz.plume.db.querydsl.transaction.TransactionManagerQuerydsl;
import com.coreoz.test.GuiceTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Test class for the CategoryDao class.
 * Tests the database access methods for category data.
 */
@GuiceTest(TestModule.class)
class CategoryDaoTest {

    @Inject
    private TransactionsDao transactionsDao;

    @Inject
    private CategoryDao categoryDao;

    @Inject
    private TransactionManagerQuerydsl transactionManager;

    @Test
    void testFetchSpentByCategoryByMonth__shouldReturnCorrectAmounts() {
        // January 2025 - According to the mock data, we have multiple DEBIT transactions:
        // ID 1001: 100.00 (Divers)
        // ID 1002: 50.25 (Divers)
        // ID 1003: 75.50 (Divers)
        // ID 1004: 200.00 (Divers)
        // ID 1005: 125.75 (Divers)
        // ID 1021: 50.00 (Divers) - from Livret A account
        // Total for January for "Divers" category: 601.50
        LocalDate january2025 = LocalDate.of(2025, 1, 1);
        List<SpentByCategory> januarySpentByCategory = categoryDao.fetchSpentByCategoryByMonth(january2025);
        
        // Convert to map for easier access by category name
        Map<String, BigDecimal> spentMap = januarySpentByCategory.stream()
            .collect(Collectors.toMap(SpentByCategory::name, SpentByCategory::spent));
        
        // Verify the total spent for "Divers" category
        assertThat(spentMap.get("Divers")).isEqualByComparingTo(new BigDecimal("601.50"));
        
        // Verify that other categories have zero spend
        assertThat(spentMap.get("Alimentaire")).isEqualByComparingTo(BigDecimal.ZERO);
        assertThat(spentMap.get("Logement & Charges")).isEqualByComparingTo(BigDecimal.ZERO);
        
        // Verify the number of categories returned (should include all categories from the database)
        assertThat(januarySpentByCategory).hasSize(14); // Total number of categories in the mock data
        
        // February 2025 - According to mock data, there are no DEBIT transactions
        LocalDate february2025 = LocalDate.of(2025, 2, 1);
        List<SpentByCategory> februarySpentByCategory = categoryDao.fetchSpentByCategoryByMonth(february2025);
        
        // All categories should have zero spend
        for (SpentByCategory category : februarySpentByCategory) {
            assertThat(category.spent()).isEqualByComparingTo(BigDecimal.ZERO);
        }
        
        // Verify budgeted amounts remain consistent
        for (SpentByCategory category : januarySpentByCategory) {
            assertThat(category.budgeted()).isEqualByComparingTo(new BigDecimal("200"));
        }
    }
}