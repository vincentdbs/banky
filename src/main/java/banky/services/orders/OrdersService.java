package banky.services.orders;

import banky.db.dao.OrdersDao;
import banky.db.generated.Orders;
import banky.webservices.api.orders.requests.CreateOrderRequest;
import banky.webservices.api.orders.responses.OrderResponse;
import banky.webservices.data.pagination.PaginatedResponse;
import banky.webservices.data.pagination.PaginationMeta;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import java.util.List;

import static banky.webservices.data.pagination.PaginationHelper.calculateTotalPages;

/**
 * Service responsible for order-related business logic.
 * Coordinates between web services and data access layer.
 */
@Singleton
public class OrdersService {
    private final OrdersDao ordersDao;

    @Inject
    private OrdersService(OrdersDao ordersDao) {
        this.ordersDao = ordersDao;
    }

    /**
     * Fetch orders with pagination support.
     * 
     * @param page The page number to retrieve (1-based)
     * @param size The number of items per page
     * @return A paginated response containing orders and pagination metadata
     */
    public PaginatedResponse<OrderResponse> fetchOrders(int page, int size) {
        // Calculate total elements and pages
        long totalElements = ordersDao.countOrders();
        int totalPages = calculateTotalPages(totalElements, size);
        
        // Ensure page is within bounds
        int adjustedPage = Math.min(Math.max(page, 1), Math.max(totalPages, 1));
        
        // Get orders for the page
        List<OrderResponse> orders = ordersDao.fetchOrders(adjustedPage, size);
        
        // Create pagination metadata
        PaginationMeta paginationMeta = new PaginationMeta(
            adjustedPage,
            totalPages,
            totalElements,
            size
        );
        
        return new PaginatedResponse<>(orders, paginationMeta);
    }

    /**
     * Creates a new order
     *
     * @param request The order details including date, name, amount, quantity, charges, accountId, and tickerId
     * @return The ID of the newly created order
     */
    public Long createOrder(CreateOrderRequest request) {
        Orders order = new Orders();
        
        order.setDate(request.date());
        order.setAmount(request.amount());
        order.setQuantity(request.quantity());
        order.setCharges(request.charges());
        order.setAccountId(request.accountId());
        order.setTickerId(request.tickerId());
        order.setSide(request.side().toString());

        return ordersDao.save(order).getId();
    }

    /**
     * Deletes an order by its ID
     *
     * @param orderId The ID of the order to delete
     */
    public void deleteOrder(Long orderId) {
        ordersDao.delete(orderId);
    }
}