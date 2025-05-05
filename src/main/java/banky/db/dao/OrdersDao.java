package banky.db.dao;

import banky.db.generated.Orders;
import banky.db.generated.QAccounts;
import banky.db.generated.QOrders;
import banky.db.generated.QTicker;
import banky.services.orders.enums.OrderSide;
import banky.services.orders.enums.TickerCategory;
import banky.webservices.api.orders.responses.OrderResponse;
import com.coreoz.plume.db.querydsl.crud.CrudDaoQuerydsl;
import com.coreoz.plume.db.querydsl.transaction.TransactionManagerQuerydsl;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

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
}