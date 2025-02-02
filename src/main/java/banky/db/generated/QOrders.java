package banky.db.generated;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;

import com.querydsl.sql.ColumnMetadata;
import java.sql.Types;




/**
 * QOrders is a Querydsl query type for Orders
 */
@Generated("com.querydsl.sql.codegen.MetaDataSerializer")
public class QOrders extends com.querydsl.sql.RelationalPathBase<Orders> {

    private static final long serialVersionUID = -512166397;

    public static final QOrders orders = new QOrders("bky_orders");

    public final NumberPath<Long> accountId = createNumber("accountId", Long.class);

    public final NumberPath<java.math.BigDecimal> amount = createNumber("amount", java.math.BigDecimal.class);

    public final NumberPath<java.math.BigDecimal> charges = createNumber("charges", java.math.BigDecimal.class);

    public final DatePath<java.time.LocalDate> date = createDate("date", java.time.LocalDate.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> quantity = createNumber("quantity", Integer.class);

    public final StringPath side = createString("side");

    public final NumberPath<Long> tickerId = createNumber("tickerId", Long.class);

    public final com.querydsl.sql.PrimaryKey<Orders> primary = createPrimaryKey(id);

    public final com.querydsl.sql.ForeignKey<Accounts> bkyOrdersIbfk1 = createForeignKey(accountId, "id");

    public final com.querydsl.sql.ForeignKey<Ticker> bkyOrdersIbfk2 = createForeignKey(tickerId, "id");

    public QOrders(String variable) {
        super(Orders.class, forVariable(variable), "null", "bky_orders");
        addMetadata();
    }

    public QOrders(String variable, String schema, String table) {
        super(Orders.class, forVariable(variable), schema, table);
        addMetadata();
    }

    public QOrders(String variable, String schema) {
        super(Orders.class, forVariable(variable), schema, "bky_orders");
        addMetadata();
    }

    public QOrders(Path<? extends Orders> path) {
        super(path.getType(), path.getMetadata(), "null", "bky_orders");
        addMetadata();
    }

    public QOrders(PathMetadata metadata) {
        super(Orders.class, metadata, "null", "bky_orders");
        addMetadata();
    }

    public void addMetadata() {
        addMetadata(accountId, ColumnMetadata.named("account_id").withIndex(6).ofType(Types.BIGINT).withSize(19).notNull());
        addMetadata(amount, ColumnMetadata.named("amount").withIndex(3).ofType(Types.DECIMAL).withSize(15).withDigits(3).notNull());
        addMetadata(charges, ColumnMetadata.named("charges").withIndex(5).ofType(Types.DECIMAL).withSize(15).withDigits(3).notNull());
        addMetadata(date, ColumnMetadata.named("date").withIndex(2).ofType(Types.DATE).withSize(10).notNull());
        addMetadata(id, ColumnMetadata.named("id").withIndex(1).ofType(Types.BIGINT).withSize(19).notNull());
        addMetadata(quantity, ColumnMetadata.named("quantity").withIndex(4).ofType(Types.INTEGER).withSize(10).notNull());
        addMetadata(side, ColumnMetadata.named("side").withIndex(8).ofType(Types.VARCHAR).withSize(255));
        addMetadata(tickerId, ColumnMetadata.named("ticker_id").withIndex(7).ofType(Types.BIGINT).withSize(19).notNull());
    }

}

