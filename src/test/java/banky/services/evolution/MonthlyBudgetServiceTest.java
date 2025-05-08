package banky.services.evolution;

import banky.db.dao.OrdersDao;
import banky.db.dao.TransactionsDao;
import banky.db.dao.TransfertDao;
import banky.db.dao.category.CategoryDao;
import banky.db.dao.category.data.SpentByCategory;
import banky.services.evolution.data.MonthlyBudgetType;
import banky.webservices.api.evolution.responses.MonthlyBudgetCategoryResponse;
import banky.webservices.api.evolution.responses.MonthlyBudgetResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

/**
 * Unit tests for MonthlyBudgetService class
 */
@ExtendWith(MockitoExtension.class)
public class MonthlyBudgetServiceTest {

    @Mock
    private TransactionsDao transactionsDao;

    @Mock
    private TransfertDao transfertDao;

    @Mock
    private OrdersDao ordersDao;

    @Mock
    private CategoryDao categoryDao;

    @InjectMocks
    private MonthlyBudgetService monthlyBudgetService;

    @Test
    void fetchMonthlyBudget_shouldReturnCorrectDataForActualBudget() {
        // Arrange
        LocalDate testDate = LocalDate.of(2025, 5, 15);
        LocalDate firstDayOfMonth = LocalDate.of(2025, 5, 1);
        MonthlyBudgetType type = MonthlyBudgetType.REAL;
        
        BigDecimal income = new BigDecimal("2500.00");
        List<SpentByCategory> spentByCategories = List.of(
            new SpentByCategory("Alimentaire", new BigDecimal("300.00"), new BigDecimal("350.00")),
            new SpentByCategory("Logement & Charges", new BigDecimal("800.00"), new BigDecimal("850.00")),
            new SpentByCategory("Divers", new BigDecimal("150.00"), new BigDecimal("200.00"))
        );
        BigDecimal orderChargesTotal = new BigDecimal("50.00");
        BigDecimal savingsTransfertsTotal = new BigDecimal("600.00");
        
        when(transactionsDao.fetchIncomeByMonth(firstDayOfMonth)).thenReturn(income);
        when(categoryDao.fetchSpentByCategoryByMonth(firstDayOfMonth)).thenReturn(spentByCategories);
        when(ordersDao.fetchChargesAmountByMonth(firstDayOfMonth)).thenReturn(orderChargesTotal);
        when(transfertDao.fetchSavingsAmountByMonth(firstDayOfMonth)).thenReturn(savingsTransfertsTotal);
        
        // Act
        MonthlyBudgetResponse response = monthlyBudgetService.fetchMonthlyBudget(testDate, type);
        
        // Assert
        // Total spent should be sum of categories + order charges + savings
        BigDecimal expectedTotal = new BigDecimal("1900.00"); // 1250 + 50 + 600
        assertThat(response.total()).isEqualByComparingTo(expectedTotal);
        
        // Total without savings
        BigDecimal expectedTotalWithoutSavings = new BigDecimal("1300.00"); // 1250 + 50
        assertThat(response.totalWithoutSavings()).isEqualByComparingTo(expectedTotalWithoutSavings);
        
        // Budgeted total should be sum of budgeted categories + budgeted savings (900)
        BigDecimal expectedBudgetedTotal = new BigDecimal("2300.00"); // 1400 + 900
        assertThat(response.budgetedTotal()).isEqualByComparingTo(expectedBudgetedTotal);
        
        // Budgeted total without savings
        BigDecimal expectedBudgetedTotalWithoutSavings = new BigDecimal("1400.00");
        assertThat(response.budgetedTotalWithoutSavings()).isEqualByComparingTo(expectedBudgetedTotalWithoutSavings);
        
        // Balance
        BigDecimal expectedBalance = new BigDecimal("100.00"); // 1400 - 1300
        assertThat(response.balance()).isEqualByComparingTo(expectedBalance);
        
        // Categories count
        assertThat(response.categories()).hasSize(3);
        
        // Verify first category details
        MonthlyBudgetCategoryResponse firstCategory = response.categories().get(0);
        assertThat(firstCategory.name()).isEqualTo("Alimentaire");
        assertThat(firstCategory.spent()).isEqualByComparingTo(new BigDecimal("300.00"));
        assertThat(firstCategory.budgeted()).isEqualByComparingTo(new BigDecimal("350.00"));
        
        // Percentages
        // Spent percentage of budgeted: (1900/2300)*100 = 82.608...%
        assertThat(response.spentPercentageOfBudgeted().intValue()).isEqualTo(82);
    }

    @Test
    void fetchMonthlyBudget_shouldReturnCorrectDataForTheoreticalBudget() {
        // Arrange
        LocalDate testDate = LocalDate.of(2025, 5, 15);
        LocalDate firstDayOfMonth = LocalDate.of(2025, 5, 1);
        MonthlyBudgetType type = MonthlyBudgetType.THEORETICAL;
        
        // For theoretical type, income is fixed at 2400
        List<SpentByCategory> spentByCategories = List.of(
            new SpentByCategory("Alimentaire", new BigDecimal("300.00"), new BigDecimal("350.00")),
            new SpentByCategory("Logement & Charges", new BigDecimal("800.00"), new BigDecimal("850.00")),
            new SpentByCategory("Divers", new BigDecimal("150.00"), new BigDecimal("200.00"))
        );
        BigDecimal orderChargesTotal = new BigDecimal("50.00");
        BigDecimal savingsTransfertsTotal = new BigDecimal("600.00");
        
        when(categoryDao.fetchSpentByCategoryByMonth(firstDayOfMonth)).thenReturn(spentByCategories);
        when(ordersDao.fetchChargesAmountByMonth(firstDayOfMonth)).thenReturn(orderChargesTotal);
        when(transfertDao.fetchSavingsAmountByMonth(firstDayOfMonth)).thenReturn(savingsTransfertsTotal);
        
        // Act
        MonthlyBudgetResponse response = monthlyBudgetService.fetchMonthlyBudget(testDate, type);
        
        // Assert
        // Verify that theoretical income is used (2400)
        // Spent percentage of total: (2300/2400)*100 = 95.833...%
        assertThat(response.spentPercentageOfTotal().intValue()).isEqualTo(95);
        
        // Verify other calculations are performed correctly
        BigDecimal expectedTotal = new BigDecimal("1900.00");
        assertThat(response.total()).isEqualByComparingTo(expectedTotal);
        
        // Verify savings values
        assertThat(response.savings()).isEqualByComparingTo(new BigDecimal("600.00"));
        assertThat(response.budgetedSavings()).isEqualByComparingTo(new BigDecimal("900.00"));
    }

    @Test
    void fetchMonthlyBudget_shouldHandleZeroSpending() {
        // Arrange
        LocalDate testDate = LocalDate.of(2025, 6, 1);
        LocalDate firstDayOfMonth = LocalDate.of(2025, 6, 1);
        MonthlyBudgetType type = MonthlyBudgetType.REAL;
        
        BigDecimal income = new BigDecimal("2500.00");
        List<SpentByCategory> spentByCategories = List.of(
            new SpentByCategory("Alimentaire", BigDecimal.ZERO, new BigDecimal("350.00")),
            new SpentByCategory("Logement & Charges", BigDecimal.ZERO, new BigDecimal("850.00")),
            new SpentByCategory("Divers", BigDecimal.ZERO, new BigDecimal("200.00"))
        );
        
        when(transactionsDao.fetchIncomeByMonth(firstDayOfMonth)).thenReturn(income);
        when(categoryDao.fetchSpentByCategoryByMonth(firstDayOfMonth)).thenReturn(spentByCategories);
        when(ordersDao.fetchChargesAmountByMonth(firstDayOfMonth)).thenReturn(BigDecimal.ZERO);
        when(transfertDao.fetchSavingsAmountByMonth(firstDayOfMonth)).thenReturn(BigDecimal.ZERO);
        
        // Act
        MonthlyBudgetResponse response = monthlyBudgetService.fetchMonthlyBudget(testDate, type);
        
        // Assert
        // All spent amounts should be zero
        assertThat(response.total()).isEqualByComparingTo(BigDecimal.ZERO);
        assertThat(response.totalWithoutSavings()).isEqualByComparingTo(BigDecimal.ZERO);
        
        // Balance should be equal to budgeted amount
        assertThat(response.balance()).isEqualByComparingTo(new BigDecimal("1400.00"));
        
        // Percentages involving division by zero should be zero
        assertThat(response.spentPercentageOfBudgeted()).isEqualByComparingTo(BigDecimal.ZERO);
        
        // Categories should still be included with zero spent
        assertThat(response.categories()).hasSize(3);
        for (MonthlyBudgetCategoryResponse category : response.categories()) {
            assertThat(category.spent()).isEqualByComparingTo(BigDecimal.ZERO);
            assertThat(category.spentPercentageOfBudgeted()).isEqualByComparingTo(BigDecimal.ZERO);
        }
    }

    @Test
    void fetchMonthlyBudget_shouldCorrectlyCalculateOrderChargesAndPercentages() {
        // Arrange
        LocalDate testDate = LocalDate.of(2025, 5, 15);
        LocalDate firstDayOfMonth = LocalDate.of(2025, 5, 1);
        MonthlyBudgetType type = MonthlyBudgetType.REAL;
        
        BigDecimal income = new BigDecimal("2500.00");
        List<SpentByCategory> spentByCategories = List.of(
            new SpentByCategory("Alimentaire", new BigDecimal("300.00"), new BigDecimal("350.00"))
        );
        BigDecimal orderChargesTotal = new BigDecimal("150.00");
        BigDecimal savingsTransfertsTotal = new BigDecimal("400.00");
        
        when(transactionsDao.fetchIncomeByMonth(firstDayOfMonth)).thenReturn(income);
        when(categoryDao.fetchSpentByCategoryByMonth(firstDayOfMonth)).thenReturn(spentByCategories);
        when(ordersDao.fetchChargesAmountByMonth(firstDayOfMonth)).thenReturn(orderChargesTotal);
        when(transfertDao.fetchSavingsAmountByMonth(firstDayOfMonth)).thenReturn(savingsTransfertsTotal);
        
        // Act
        MonthlyBudgetResponse response = monthlyBudgetService.fetchMonthlyBudget(testDate, type);
        
        // Assert
        // Verify order charges are correctly included in calculations
        assertThat(response.orderCharges()).isEqualByComparingTo(orderChargesTotal);
        assertThat(response.total()).isEqualByComparingTo(new BigDecimal("850.00")); // 300 + 150 + 400
        
        // Test category percentage calculations
        MonthlyBudgetCategoryResponse category = response.categories().get(0);
        // Spent percentage of budgeted: (300/350)*100 = 85.71...%
        assertThat(category.spentPercentageOfBudgeted().intValue()).isEqualTo(85);
        // Spent percentage of total income: (300/2500)*100 = 12.00%
        assertThat(category.spentPercentageOfTotal().intValue()).isEqualTo(12);
        
        // Budgeted vs actual percentages
        // Budgeted total: 350 + 900 = 1250
        // Spent percentage of budgeted: (850/1250)*100 = 68.00%
        assertThat(response.spentPercentageOfBudgeted().intValue()).isEqualTo(68);
    }
}
