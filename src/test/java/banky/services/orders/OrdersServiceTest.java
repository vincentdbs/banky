package banky.services.orders;

import banky.db.dao.OrdersDao;
import banky.db.generated.Orders;
import banky.services.orders.enums.OrderSide;
import banky.services.orders.enums.TickerCategory;
import banky.webservices.api.orders.requests.OrderRequest;
import banky.webservices.api.orders.responses.OrderResponse;
import banky.webservices.data.pagination.PaginatedResponse;
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
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;

/**
 * Unit tests for OrdersService class
 */
@ExtendWith(MockitoExtension.class)
class OrdersServiceTest {

    @Mock
    private OrdersDao ordersDao;

    @InjectMocks
    private OrdersService ordersService;

    @Test
    void fetchOrders_shouldReturnPaginatedResponse() {
        // Arrange
        List<OrderResponse> expectedOrders = List.of(
            new OrderResponse(
                1L,
                LocalDate.of(2025, 5, 1),
                "LVMH",
                new BigDecimal("1500.00"),
                10,
                new BigDecimal("9.90"),
                "PEA",
                "4682B4",
                OrderSide.BUY,
                "LVMH",
                TickerCategory.CAPITALIZING
            )
        );
        when(ordersDao.countOrders()).thenReturn(1L);
        when(ordersDao.fetchOrders(anyInt(), anyInt())).thenReturn(expectedOrders);

        // Act
        PaginatedResponse<OrderResponse> paginatedResponse = ordersService.fetchOrders(1, 20);

        // Assert
        assertThat(paginatedResponse.content()).isEqualTo(expectedOrders);
        assertThat(paginatedResponse.pagination().currentPage()).isEqualTo(1);
        assertThat(paginatedResponse.pagination().totalPages()).isEqualTo(1);
        assertThat(paginatedResponse.pagination().totalElements()).isEqualTo(1);
        assertThat(paginatedResponse.pagination().size()).isEqualTo(20);
    }

    @Test
    void createOrder_shouldSaveOrderAndReturnId() {
        // Arrange
        OrderRequest request = new OrderRequest(
            LocalDate.of(2025, 5, 1),
            "LVMH",
            new BigDecimal("1500.00"),
            10,
            new BigDecimal("9.90"),
            11L,
            1L,
            OrderSide.BUY
        );

        Orders savedOrder = new Orders();
        savedOrder.setId(1L);
        when(ordersDao.save(any(Orders.class))).thenReturn(savedOrder);

        // Act
        Long orderId = ordersService.createOrder(request);

        // Assert
        assertThat(orderId).isEqualTo(1L);
    }
}