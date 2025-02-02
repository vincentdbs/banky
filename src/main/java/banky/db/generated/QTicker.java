package banky.db.generated;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;

import com.querydsl.sql.ColumnMetadata;
import java.sql.Types;




/**
 * QTicker is a Querydsl query type for Ticker
 */
@Generated("com.querydsl.sql.codegen.MetaDataSerializer")
public class QTicker extends com.querydsl.sql.RelationalPathBase<Ticker> {

    private static final long serialVersionUID = -377356760;

    public static final QTicker ticker = new QTicker("bky_ticker");

    public final StringPath category = createString("category");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath name = createString("name");

    public final StringPath shortName = createString("shortName");

    public final com.querydsl.sql.PrimaryKey<Ticker> primary = createPrimaryKey(id);

    public final com.querydsl.sql.ForeignKey<Orders> _bkyOrdersIbfk2 = createInvForeignKey(id, "ticker_id");

    public QTicker(String variable) {
        super(Ticker.class, forVariable(variable), "null", "bky_ticker");
        addMetadata();
    }

    public QTicker(String variable, String schema, String table) {
        super(Ticker.class, forVariable(variable), schema, table);
        addMetadata();
    }

    public QTicker(String variable, String schema) {
        super(Ticker.class, forVariable(variable), schema, "bky_ticker");
        addMetadata();
    }

    public QTicker(Path<? extends Ticker> path) {
        super(path.getType(), path.getMetadata(), "null", "bky_ticker");
        addMetadata();
    }

    public QTicker(PathMetadata metadata) {
        super(Ticker.class, metadata, "null", "bky_ticker");
        addMetadata();
    }

    public void addMetadata() {
        addMetadata(category, ColumnMetadata.named("category").withIndex(4).ofType(Types.VARCHAR).withSize(255).notNull());
        addMetadata(id, ColumnMetadata.named("id").withIndex(1).ofType(Types.BIGINT).withSize(19).notNull());
        addMetadata(name, ColumnMetadata.named("name").withIndex(2).ofType(Types.VARCHAR).withSize(255).notNull());
        addMetadata(shortName, ColumnMetadata.named("short_name").withIndex(3).ofType(Types.VARCHAR).withSize(50).notNull());
    }

}

