package banky.db.dao;

import banky.db.generated.Orders;
import banky.db.generated.QOrders;
import banky.guice.TestModule;
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
            assertThat(order.name()).isNotNull();
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
            assertThat(order.name()).isEqualTo("LVMH Moët Hennessy");
            assertThat(order.amount()).isEqualByComparingTo(new BigDecimal("1000.50"));
            assertThat(order.quantity()).isEqualTo(5);
            assertThat(order.date()).isEqualTo(LocalDate.of(2025, 1, 10));
            assertThat(order.side()).isEqualTo("BUY");
            assertThat(order.tickerShortName()).isEqualTo("LVMH");
            assertThat(order.tickerCategory()).isEqualTo("CAPITALIZING");
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
}