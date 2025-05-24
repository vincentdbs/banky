package banky.db.dao;

import banky.db.generated.Orders;
import banky.db.generated.QAccounts;
import banky.db.generated.QOrders;
import banky.db.generated.QTicker;
import banky.services.orders.enums.OrderSide;
import banky.services.tickers.enums.TickerCategory;
import banky.webservices.api.orders.responses.OrderResponse;
import com.coreoz.plume.db.querydsl.crud.CrudDaoQuerydsl;
import com.coreoz.plume.db.querydsl.transaction.TransactionManagerQuerydsl;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

/**
 * Data Access Object for order operations.
 * Provides database access methods for order data with pagination support.
 */
@Singleton
public class OrdersDao extends CrudDaoQuerydsl<Orders> {

    @Inject
    private OrdersDao(TransactionManagerQuerydsl transactionManagerQuerydsl) {
        super(transactionManagerQuerydsl, QOrders.orders);
    }

    /**
     * Fetches orders with pagination support
     * 
     * @param page The page number (1-based)
     * @param size The number of items per page
     * @return A list of orders for the requested page
     */
    public List<OrderResponse> fetchOrders(int page, int size) {
        int offset = (page - 1) * size; // Convert to 0-based for database query
        
        QAccounts account = new QAccounts("account");
        QTicker ticker = new QTicker("ticker");

        return this.transactionManager
            .selectQuery()
            .select(
                QOrders.orders.id,
                QOrders.orders.date,
                QOrders.orders.amount,
                QOrders.orders.quantity,
                QOrders.orders.charges,
                account.shortName,
                account.color,
                QOrders.orders.side,
                ticker.shortName,
                ticker.category
            )
            .from(QOrders.orders)
            .innerJoin(account)
            .on(QOrders.orders.accountId.eq(account.id))
            .innerJoin(ticker)
            .on(QOrders.orders.tickerId.eq(ticker.id))
            .offset(offset)
            .limit(size)
            .orderBy(QOrders.orders.date.desc())
            .fetch()
            .stream()
            .map(
                order -> new OrderResponse(
                    order.get(QOrders.orders.id),
                    order.get(QOrders.orders.date),
                    order.get(QOrders.orders.amount),
                    order.get(QOrders.orders.quantity),
                    order.get(QOrders.orders.charges),
                    order.get(account.shortName),
                    order.get(account.color),
                    OrderSide.valueOf(order.get(QOrders.orders.side)),
                    order.get(ticker.shortName),
                    TickerCategory.valueOf(order.get(ticker.category))
                )
            )
            .toList();
    }
    
    /**
     * Count the total number of orders in the database
     * 
     * @return The total count of orders
     */
    public long countOrders() {
        return this.transactionManager
            .selectQuery()
            .select(QOrders.orders.count())
            .from(QOrders.orders)
            .fetchOne();
    }

    /**
     * Calculate the total charges amount for all orders in a specific month
     * 
     * @param firstDayOfTheMonth The first day of the month to calculate charges for
     * @return The sum of all charges in the specified month, or zero if no orders exist
     */
    public BigDecimal fetchChargesAmountByMonth(LocalDate firstDayOfTheMonth) {
        // Calculate the last day of the month
        LocalDate lastDayOfTheMonth = firstDayOfTheMonth.plusMonths(1).minusDays(1);
        
        BigDecimal sum = this.transactionManager
            .selectQuery()
            .select(QOrders.orders.charges.sum())
            .from(QOrders.orders)
            .where(QOrders.orders.date.goe(firstDayOfTheMonth)
                .and(QOrders.orders.date.loe(lastDayOfTheMonth)))
            .fetchOne();
            
        // Return 0 if there are no orders in the specified month
        return sum == null ? BigDecimal.ZERO : sum;
    }

    /**
     * Check if an order exists in the database
     * 
     * @param orderId The ID of the order to check
     * @return true if the order exists, false otherwise
     */
    public boolean orderExists(Long orderId) {
        return this.transactionManager
            .selectQuery()
            .select(QOrders.orders.count())
            .from(QOrders.orders)
            .where(QOrders.orders.id.eq(orderId))
            .fetchOne() > 0;
    }
}