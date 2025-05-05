package banky.webservices.api.orders;

import banky.services.accounts.enums.AccountType;
import banky.services.orders.OrdersService;
import banky.services.orders.enums.OrderSide;
import banky.services.orders.enums.TickerCategory;
import banky.webservices.api.orders.requests.OrderRequest;
import banky.webservices.api.orders.responses.OrderResponse;
import banky.webservices.data.pagination.PaginatedResponse;
import banky.webservices.data.pagination.PaginationMeta;
import banky.webservices.exceptions.BankyWsError;
import banky.webservices.validators.AccountValidator;
import banky.webservices.validators.AmountValidator;
import com.coreoz.plume.jersey.errors.WsException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;

/**
 * Unit tests for OrdersWs class
 */
@ExtendWith(MockitoExtension.class)
class OrdersWsTest {

    @Mock
    private OrdersService ordersService;
    
    @Mock
    private AccountValidator accountValidator;
    
    @Mock
    private AmountValidator amountValidator;

    @InjectMocks
    private OrdersWs ordersWs;

    @Test
    void fetchOrders_shouldReturnPaginatedOrders_withDefaultPagination() {
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
        PaginationMeta paginationMeta = new PaginationMeta(1, 1, 1, 20);
        PaginatedResponse<OrderResponse> expectedResponse = 
            new PaginatedResponse<>(expectedOrders, paginationMeta);
            
        when(ordersService.fetchOrders(1, 20)).thenReturn(expectedResponse);

        // Act
        PaginatedResponse<OrderResponse> actualResponse = ordersWs.fetchOrders(null, null);

        // Assert
        assertThat(actualResponse).isEqualTo(expectedResponse);
        assertThat(actualResponse.content()).isEqualTo(expectedOrders);
        assertThat(actualResponse.pagination().currentPage()).isEqualTo(1);
        assertThat(actualResponse.pagination().size()).isEqualTo(20);
    }

    @Test
    void fetchOrders_shouldReturnPaginatedOrders_withCustomPagination() {
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
        PaginationMeta paginationMeta = new PaginationMeta(2, 5, 42, 10);
        PaginatedResponse<OrderResponse> expectedResponse = 
            new PaginatedResponse<>(expectedOrders, paginationMeta);
            
        when(ordersService.fetchOrders(2, 10)).thenReturn(expectedResponse);

        // Act
        PaginatedResponse<OrderResponse> actualResponse = ordersWs.fetchOrders(2, 10);

        // Assert
        assertThat(actualResponse).isEqualTo(expectedResponse);
        assertThat(actualResponse.content()).isEqualTo(expectedOrders);
        assertThat(actualResponse.pagination().currentPage()).isEqualTo(2);
        assertThat(actualResponse.pagination().size()).isEqualTo(10);
    }

    @Test
    void createOrder_shouldReturnNewId_whenRequestIsValid() {
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
        when(ordersService.createOrder(request)).thenReturn(1L);

        // Act
        long id = ordersWs.createOrder(request);

        // Assert
        assertThat(id).isEqualTo(1L);
    }

    @Test
    void createOrder_shouldThrowException_whenDateIsMissing() {
        // Arrange
        OrderRequest request = new OrderRequest(
            null,
            "LVMH",
            new BigDecimal("1500.00"),
            10,
            new BigDecimal("9.90"),
            11L,
            1L,
            OrderSide.BUY
        );

        // Act & Assert
        assertThatThrownBy(() -> ordersWs.createOrder(request))
            .isInstanceOf(WsException.class);
    }

    @Test
    void createOrder_shouldThrowException_whenNameIsMissing() {
        // Arrange
        OrderRequest request = new OrderRequest(
            LocalDate.of(2025, 5, 1),
            null,
            new BigDecimal("1500.00"),
            10,
            new BigDecimal("9.90"),
            11L,
            1L,
            OrderSide.BUY
        );

        // Act & Assert
        assertThatThrownBy(() -> ordersWs.createOrder(request))
            .isInstanceOf(WsException.class);
    }

    @Test
    void createOrder_shouldThrowException_whenAmountIsMissing() {
        // Arrange
        OrderRequest request = new OrderRequest(
            LocalDate.of(2025, 5, 1),
            "LVMH",
            null,
            10,
            new BigDecimal("9.90"),
            11L,
            1L,
            OrderSide.BUY
        );

        // Act & Assert
        assertThatThrownBy(() -> ordersWs.createOrder(request))
            .isInstanceOf(WsException.class);
    }

    @Test
    void createOrder_shouldThrowException_whenQuantityIsMissing() {
        // Arrange
        OrderRequest request = new OrderRequest(
            LocalDate.of(2025, 5, 1),
            "LVMH",
            new BigDecimal("1500.00"),
            null,
            new BigDecimal("9.90"),
            11L,
            1L,
            OrderSide.BUY
        );

        // Act & Assert
        assertThatThrownBy(() -> ordersWs.createOrder(request))
            .isInstanceOf(WsException.class);
    }

    @Test
    void createOrder_shouldThrowException_whenChargesIsMissing() {
        // Arrange
        OrderRequest request = new OrderRequest(
            LocalDate.of(2025, 5, 1),
            "LVMH",
            new BigDecimal("1500.00"),
            10,
            null,
            11L,
            1L,
            OrderSide.BUY
        );

        // Act & Assert
        assertThatThrownBy(() -> ordersWs.createOrder(request))
            .isInstanceOf(WsException.class);
    }

    @Test
    void createOrder_shouldThrowException_whenAccountIdIsMissing() {
        // Arrange
        OrderRequest request = new OrderRequest(
            LocalDate.of(2025, 5, 1),
            "LVMH",
            new BigDecimal("1500.00"),
            10,
            new BigDecimal("9.90"),
            null,
            1L,
            OrderSide.BUY
        );

        // Act & Assert
        assertThatThrownBy(() -> ordersWs.createOrder(request))
            .isInstanceOf(WsException.class);
    }

    @Test
    void createOrder_shouldThrowException_whenTickerIdIsMissing() {
        // Arrange
        OrderRequest request = new OrderRequest(
            LocalDate.of(2025, 5, 1),
            "LVMH",
            new BigDecimal("1500.00"),
            10,
            new BigDecimal("9.90"),
            11L,
            null,
            OrderSide.BUY
        );

        // Act & Assert
        assertThatThrownBy(() -> ordersWs.createOrder(request))
            .isInstanceOf(WsException.class);
    }

    @Test
    void createOrder_shouldThrowException_whenSideIsMissing() {
        // Arrange
        OrderRequest request = new OrderRequest(
            LocalDate.of(2025, 5, 1),
            "LVMH",
            new BigDecimal("1500.00"),
            10,
            new BigDecimal("9.90"),
            11L,
            1L,
            null
        );

        // Act & Assert
        assertThatThrownBy(() -> ordersWs.createOrder(request))
            .isInstanceOf(WsException.class);
    }

    @Test
    void createOrder_shouldThrowException_whenAmountIsNotPositive() {
        // Arrange
        OrderRequest request = new OrderRequest(
            LocalDate.of(2025, 5, 1),
            "LVMH",
            new BigDecimal("0.00"), // Zero amount - should be rejected
            10,
            new BigDecimal("9.90"),
            11L,
            1L,
            OrderSide.BUY
        );
        
        // Configure the validator to throw an exception for non-positive amount
        doThrow(new WsException(BankyWsError.INVALID_AMOUNT))
            .when(amountValidator)
            .validatePositiveAmount(request.amount());

        // Act & Assert
        assertThatThrownBy(() -> ordersWs.createOrder(request))
            .isInstanceOf(WsException.class)
            .matches(e -> ((WsException) e).getError().equals(BankyWsError.INVALID_AMOUNT));
    }

    @Test
    void createOrder_shouldThrowException_whenAccountIsNotMarketType() {
        // Arrange
        OrderRequest request = new OrderRequest(
            LocalDate.of(2025, 5, 1),
            "LVMH",
            new BigDecimal("1500.00"),
            10,
            new BigDecimal("9.90"),
            1L, // Account ID that is not a MARKET account
            1L,
            OrderSide.BUY
        );
        
        // Configure the validator to throw an exception for non-MARKET account
        doThrow(new WsException(BankyWsError.INVALID_ACCOUNT_TYPE))
            .when(accountValidator)
            .validateAccountType(eq(1L), eq(AccountType.MARKET));

        // Act & Assert
        assertThatThrownBy(() -> ordersWs.createOrder(request))
            .isInstanceOf(WsException.class)
            .matches(e -> ((WsException) e).getError().equals(BankyWsError.INVALID_ACCOUNT_TYPE));
    }
}