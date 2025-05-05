package banky.webservices.api.orders;

import banky.guice.TestModule;
import banky.services.orders.enums.OrderSide;
import banky.webservices.api.orders.requests.OrderRequest;
import banky.webservices.api.orders.responses.OrderResponse;
import banky.webservices.data.pagination.PaginatedResponse;
import com.coreoz.test.GuiceTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Integration tests for OrdersWs endpoints
 */
@GuiceTest(TestModule.class)
class OrdersWsIntegrationTest {

    @Inject
    private OrdersWs ordersWs;
    private final OrderRequest testOrderRequest = new OrderRequest(
        LocalDate.of(2025, 5, 15),
        "Test Order",
        new BigDecimal("500.00"),
        5,
        new BigDecimal("5.50"),
        11L,
        1L,
        OrderSide.BUY
    );

    @Test
    void fetchOrders_shouldReturnValidResponse_withDefaultPagination() {
        // Act
        PaginatedResponse<OrderResponse> response = ordersWs.fetchOrders(null, null);

        // Assert
        assertThat(response).isNotNull();
        assertThat(response.content()).isNotNull();
        assertThat(response.pagination()).isNotNull();
        assertThat(response.pagination().currentPage()).isEqualTo(1);
        assertThat(response.pagination().size()).isEqualTo(20);
    }
    
    @Test
    void fetchOrders_shouldReturnValidResponse_withCustomPagination() {
        // Arrange
        Integer page = 2;
        Integer size = 5;
        
        // Act
        PaginatedResponse<OrderResponse> response = ordersWs.fetchOrders(page, size);

        // Assert
        assertThat(response).isNotNull();
        assertThat(response.content()).isNotNull();
        assertThat(response.pagination()).isNotNull();
        assertThat(response.pagination().currentPage()).isEqualTo(page);
        assertThat(response.pagination().size()).isEqualTo(size);
    }

    @Test
    void createOrder_shouldReturnValidId() {
        // Act
        Long orderId = ordersWs.createOrder(testOrderRequest);

        // Assert  
        assertThat(orderId).isNotNull();
    }
}