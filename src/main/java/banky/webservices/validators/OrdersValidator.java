package banky.webservices.validators;

import banky.db.dao.OrdersDao;
import banky.db.generated.Orders;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import jakarta.ws.rs.NotFoundException;

/**
 * Validator for order-related operations.
 * Contains methods to validate order data and check for order existence.
 */
@Singleton
public class OrdersValidator {

    private final OrdersDao ordersDao;

    @Inject
    private OrdersValidator(OrdersDao ordersDao) {
        this.ordersDao = ordersDao;
    }
    
    /**
     * Check if an order exists and return it if it does.
     * 
     * @param id The ID of the order to check
     * @return The order if it exists
     * @throws NotFoundException if the order does not exist
     */
    public Orders checkOrderExists(Long id) {
        Orders order = ordersDao.findById(id);

        if (order == null) {
            throw new NotFoundException("Order with ID " + id + " not found");
        }

        return order;
    }
}
