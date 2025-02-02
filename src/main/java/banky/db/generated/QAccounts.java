package banky.db.generated;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;

import com.querydsl.sql.ColumnMetadata;
import java.sql.Types;




/**
 * QAccounts is a Querydsl query type for Accounts
 */
@Generated("com.querydsl.sql.codegen.MetaDataSerializer")
public class QAccounts extends com.querydsl.sql.RelationalPathBase<Accounts> {

    private static final long serialVersionUID = -1642135676;

    public static final QAccounts accounts = new QAccounts("bky_accounts");

    public final StringPath color = createString("color");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<java.math.BigDecimal> initialAmount = createNumber("initialAmount", java.math.BigDecimal.class);

    public final StringPath name = createString("name");

    public final StringPath shortName = createString("shortName");

    public final StringPath type = createString("type");

    public final com.querydsl.sql.PrimaryKey<Accounts> primary = createPrimaryKey(id);

    public final com.querydsl.sql.ForeignKey<Orders> _bkyOrdersIbfk1 = createInvForeignKey(id, "account_id");

    public final com.querydsl.sql.ForeignKey<Transactions> _bkyTransactionsIbfk1 = createInvForeignKey(id, "account_id");

    public final com.querydsl.sql.ForeignKey<Transfert> _bkyTransfertIbfk1 = createInvForeignKey(id, "from_account_id");

    public final com.querydsl.sql.ForeignKey<Transfert> _bkyTransfertIbfk2 = createInvForeignKey(id, "to_account_id");

    public QAccounts(String variable) {
        super(Accounts.class, forVariable(variable), "null", "bky_accounts");
        addMetadata();
    }

    public QAccounts(String variable, String schema, String table) {
        super(Accounts.class, forVariable(variable), schema, table);
        addMetadata();
    }

    public QAccounts(String variable, String schema) {
        super(Accounts.class, forVariable(variable), schema, "bky_accounts");
        addMetadata();
    }

    public QAccounts(Path<? extends Accounts> path) {
        super(path.getType(), path.getMetadata(), "null", "bky_accounts");
        addMetadata();
    }

    public QAccounts(PathMetadata metadata) {
        super(Accounts.class, metadata, "null", "bky_accounts");
        addMetadata();
    }

    public void addMetadata() {
        addMetadata(color, ColumnMetadata.named("color").withIndex(4).ofType(Types.VARCHAR).withSize(6).notNull());
        addMetadata(id, ColumnMetadata.named("id").withIndex(1).ofType(Types.BIGINT).withSize(19).notNull());
        addMetadata(initialAmount, ColumnMetadata.named("initial_amount").withIndex(5).ofType(Types.DECIMAL).withSize(15).withDigits(2).notNull());
        addMetadata(name, ColumnMetadata.named("name").withIndex(2).ofType(Types.VARCHAR).withSize(255).notNull());
        addMetadata(shortName, ColumnMetadata.named("short_name").withIndex(3).ofType(Types.VARCHAR).withSize(3).notNull());
        addMetadata(type, ColumnMetadata.named("type").withIndex(6).ofType(Types.VARCHAR).withSize(255).notNull());
    }

}

