package banky.db.generated;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;

import com.querydsl.sql.ColumnMetadata;
import java.sql.Types;




/**
 * QTransfert is a Querydsl query type for Transfert
 */
@Generated("com.querydsl.sql.codegen.MetaDataSerializer")
public class QTransfert extends com.querydsl.sql.RelationalPathBase<Transfert> {

    private static final long serialVersionUID = -781879797;

    public static final QTransfert transfert = new QTransfert("bky_transfert");

    public final NumberPath<java.math.BigDecimal> amount = createNumber("amount", java.math.BigDecimal.class);

    public final NumberPath<Long> fromAccountId = createNumber("fromAccountId", Long.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Long> toAccountId = createNumber("toAccountId", Long.class);

    public final com.querydsl.sql.PrimaryKey<Transfert> primary = createPrimaryKey(id);

    public final com.querydsl.sql.ForeignKey<Accounts> bkyTransfertIbfk1 = createForeignKey(fromAccountId, "id");

    public final com.querydsl.sql.ForeignKey<Accounts> bkyTransfertIbfk2 = createForeignKey(toAccountId, "id");

    public QTransfert(String variable) {
        super(Transfert.class, forVariable(variable), "null", "bky_transfert");
        addMetadata();
    }

    public QTransfert(String variable, String schema, String table) {
        super(Transfert.class, forVariable(variable), schema, table);
        addMetadata();
    }

    public QTransfert(String variable, String schema) {
        super(Transfert.class, forVariable(variable), schema, "bky_transfert");
        addMetadata();
    }

    public QTransfert(Path<? extends Transfert> path) {
        super(path.getType(), path.getMetadata(), "null", "bky_transfert");
        addMetadata();
    }

    public QTransfert(PathMetadata metadata) {
        super(Transfert.class, metadata, "null", "bky_transfert");
        addMetadata();
    }

    public void addMetadata() {
        addMetadata(amount, ColumnMetadata.named("amount").withIndex(4).ofType(Types.DECIMAL).withSize(15).withDigits(3).notNull());
        addMetadata(fromAccountId, ColumnMetadata.named("from_account_id").withIndex(2).ofType(Types.BIGINT).withSize(19));
        addMetadata(id, ColumnMetadata.named("id").withIndex(1).ofType(Types.BIGINT).withSize(19).notNull());
        addMetadata(toAccountId, ColumnMetadata.named("to_account_id").withIndex(3).ofType(Types.BIGINT).withSize(19));
    }

}

