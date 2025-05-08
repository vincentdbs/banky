package banky.db.dao;

import banky.db.generated.Orders;
import banky.db.generated.QOrders;
import banky.guice.TestModule;
import banky.services.orders.enums.OrderSide;
import banky.services.tickers.enums.TickerCategory;
import banky.webservices.api.orders.responses.OrderResponse;
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
 * Integration tests for OrdersDao using the existing mock data from database migrations
 */
@GuiceTest(TestModule.class)
class OrdersDaoTest {

    @Inject
    private OrdersDao ordersDao;

    @Inject
    private TransactionManagerQuerydsl transactionManager;

    @Test
    void fetchOrders_shouldReturnPagedOrdersWithDetails() {
        // Act
        List<OrderResponse> orders = ordersDao.fetchOrders(1, 10);

        // Assert
        assertThat(orders).isNotEmpty();
        assertThat(orders.size()).isLessThanOrEqualTo(10); // Should not exceed page size

        // Verify all orders have the expected data structure
        for (OrderResponse order : orders) {
            assertThat(order.id()).isNotNull();
            assertThat(order.date()).isNotNull();
            assertThat(order.amount()).isNotNull();
            assertThat(order.quantity()).isNotNull();
            assertThat(order.charges()).isNotNull();
            assertThat(order.accountShortName()).isNotNull();
            assertThat(order.accountColor()).isNotNull();
            assertThat(order.side()).isNotNull();
            assertThat(order.tickerShortName()).isNotNull();
            assertThat(order.tickerCategory()).isNotNull();
        }

        // Find a specific order from the mock data (id: 101)
        Optional<OrderResponse> specificOrder = orders.stream()
            .filter(t -> t.id() == 101L)
            .findFirst();

        if (specificOrder.isPresent()) {
            OrderResponse order = specificOrder.get();
            assertThat(order.id()).isEqualTo(101L);
            assertThat(order.accountShortName()).isEqualTo("PEA"); // PEA account
            assertThat(order.amount()).isEqualByComparingTo(new BigDecimal("1000.50"));
            assertThat(order.quantity()).isEqualTo(5);
            assertThat(order.date()).isEqualTo(LocalDate.of(2025, 1, 10));
            assertThat(order.side()).isEqualTo(OrderSide.BUY);
            assertThat(order.tickerShortName()).isEqualTo("LVMH");
            assertThat(order.tickerCategory()).isEqualTo(TickerCategory.CAPITALIZING);
        }
    }

    @Test
    void fetchOrders_shouldRespectPaginationParameters() {
        // Act - Request first page with 3 items
        List<OrderResponse> firstPage = ordersDao.fetchOrders(1, 3);
        // Act - Request second page with 3 items
        List<OrderResponse> secondPage = ordersDao.fetchOrders(2, 3);

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
    void countOrders_shouldReturnTotalCount() {
        // Act
        long count = ordersDao.countOrders();

        // Assert
        assertThat(count).isGreaterThanOrEqualTo(10); // There are at least 10 order records in the mock data
    }

    @Test
    void save_shouldCreateNewOrder() {
        // Arrange
        Long accountId = 11L; // PEA
        Long tickerId = 1L; // LVMH
        BigDecimal amount = new BigDecimal("1200.50");
        BigDecimal charges = new BigDecimal("9.90");
        Integer quantity = 7;
        LocalDate date = LocalDate.now();
        String side = "BUY";

        Orders order = new Orders();
        order.setAccountId(accountId);
        order.setTickerId(tickerId);
        order.setAmount(amount);
        order.setCharges(charges);
        order.setQuantity(quantity);
        order.setDate(date);
        order.setSide(side);

        // Act
        Orders savedOrder = ordersDao.save(order);

        // Assert
        assertThat(savedOrder.getId()).isNotNull();

        // Verify the order was properly saved by querying it
        Orders retrievedOrder = transactionManager
            .selectQuery()
            .select(QOrders.orders)
            .from(QOrders.orders)
            .where(QOrders.orders.id.eq(savedOrder.getId()))
            .fetchOne();

        assertThat(retrievedOrder).isNotNull();
        assertThat(retrievedOrder.getAccountId()).isEqualTo(accountId);
        assertThat(retrievedOrder.getTickerId()).isEqualTo(tickerId);
        assertThat(retrievedOrder.getAmount()).isEqualByComparingTo(amount);
        assertThat(retrievedOrder.getCharges()).isEqualByComparingTo(charges);
        assertThat(retrievedOrder.getQuantity()).isEqualTo(quantity);
        assertThat(retrievedOrder.getDate()).isEqualTo(date);
        assertThat(retrievedOrder.getSide()).isEqualTo(side);

        // Clean up test data
        transactionManager
            .delete(QOrders.orders)
            .where(QOrders.orders.id.eq(savedOrder.getId()))
            .execute();
    }

    @Test
    void fetchChargesAmountByMonth_shouldCalculateJanuaryCharges() {
        // Arrange - January 2025
        LocalDate january2025 = LocalDate.of(2025, 1, 1);
        
        // Act
        BigDecimal chargesAmount = ordersDao.fetchChargesAmountByMonth(january2025);
        
        // Assert
        // In January we have orders with IDs 101, 102, 103
        // Charges should be summed up from mock data
        assertThat(chargesAmount).isGreaterThan(BigDecimal.ZERO);
    }
    
    @Test
    void fetchChargesAmountByMonth_shouldRespectMonthBoundaries() {
        // Arrange
        LocalDate testDate = LocalDate.of(2025, 3, 1);
        
        // Create an order in March
        Orders marchOrder = new Orders();
        marchOrder.setAccountId(11L); // PEA
        marchOrder.setTickerId(1L);   // LVMH
        marchOrder.setAmount(new BigDecimal("2000.00"));
        marchOrder.setCharges(new BigDecimal("15.50"));
        marchOrder.setQuantity(10);
        marchOrder.setDate(testDate.plusDays(15)); // March 16, 2025
        marchOrder.setSide("BUY");
        Orders savedMarchOrder = ordersDao.save(marchOrder);
        
        // Create an order in April (should not be counted)
        Orders aprilOrder = new Orders();
        aprilOrder.setAccountId(11L);
        aprilOrder.setTickerId(1L);
        aprilOrder.setAmount(new BigDecimal("1000.00"));
        aprilOrder.setCharges(new BigDecimal("9.90"));
        aprilOrder.setQuantity(5);
        aprilOrder.setDate(testDate.plusMonths(1).plusDays(5)); // April 6, 2025
        aprilOrder.setSide("BUY");
        Orders savedAprilOrder = ordersDao.save(aprilOrder);
        
        try {
            // Act
            BigDecimal marchCharges = ordersDao.fetchChargesAmountByMonth(testDate);
            BigDecimal aprilCharges = ordersDao.fetchChargesAmountByMonth(testDate.plusMonths(1));
            
            // Assert
            assertThat(marchCharges).isEqualByComparingTo(new BigDecimal("15.50"));
            assertThat(aprilCharges).isEqualByComparingTo(new BigDecimal("9.90"));
        } finally {
            // Clean up test data
            transactionManager
                .delete(QOrders.orders)
                .where(QOrders.orders.id.in(savedMarchOrder.getId(), savedAprilOrder.getId()))
                .execute();
        }
    }
    
    @Test
    void fetchChargesAmountByMonth_shouldReturnZeroForMonthWithNoOrders() {
        // Arrange - December 2024 (no orders in mock data)
        LocalDate december2024 = LocalDate.of(2024, 12, 1);
        
        // Act
        BigDecimal chargesAmount = ordersDao.fetchChargesAmountByMonth(december2024);
        
        // Assert
        assertThat(chargesAmount).isEqualByComparingTo(BigDecimal.ZERO);
    }
    
    @Test
    void fetchChargesAmountByMonth_shouldAccumulateMultipleOrdersInSameMonth() {
        // Arrange
        LocalDate testDate = LocalDate.of(2025, 5, 1);
        BigDecimal firstCharges = new BigDecimal("12.50");
        BigDecimal secondCharges = new BigDecimal("8.75");
        BigDecimal expectedTotal = new BigDecimal("21.25");
        
        // Create first order
        Orders firstOrder = new Orders();
        firstOrder.setAccountId(11L);
        firstOrder.setTickerId(1L);
        firstOrder.setAmount(new BigDecimal("1500.00"));
        firstOrder.setCharges(firstCharges);
        firstOrder.setQuantity(7);
        firstOrder.setDate(testDate.plusDays(10)); // May 11, 2025
        firstOrder.setSide("BUY");
        Orders savedFirstOrder = ordersDao.save(firstOrder);
        
        // Create second order in same month
        Orders secondOrder = new Orders();
        secondOrder.setAccountId(11L);
        secondOrder.setTickerId(2L);
        secondOrder.setAmount(new BigDecimal("900.00"));
        secondOrder.setCharges(secondCharges);
        secondOrder.setQuantity(3);
        secondOrder.setDate(testDate.plusDays(20)); // May 21, 2025
        secondOrder.setSide("BUY");
        Orders savedSecondOrder = ordersDao.save(secondOrder);
        
        try {
            // Act
            BigDecimal totalCharges = ordersDao.fetchChargesAmountByMonth(testDate);
            
            // Assert
            assertThat(totalCharges).isEqualByComparingTo(expectedTotal);
        } finally {
            // Clean up test data
            transactionManager
                .delete(QOrders.orders)
                .where(QOrders.orders.id.in(savedFirstOrder.getId(), savedSecondOrder.getId()))
                .execute();
        }
    }
}