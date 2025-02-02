package banky.db.generated;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;

import com.querydsl.sql.ColumnMetadata;
import java.sql.Types;




/**
 * QTransactions is a Querydsl query type for Transactions
 */
@Generated("com.querydsl.sql.codegen.MetaDataSerializer")
public class QTransactions extends com.querydsl.sql.RelationalPathBase<Transactions> {

    private static final long serialVersionUID = -1571566093;

    public static final QTransactions transactions = new QTransactions("bky_transactions");

    public final NumberPath<Long> accountId = createNumber("accountId", Long.class);

    public final NumberPath<java.math.BigDecimal> amount = createNumber("amount", java.math.BigDecimal.class);

    public final StringPath comment = createString("comment");

    public final DatePath<java.time.LocalDate> date = createDate("date", java.time.LocalDate.class);

    public final StringPath fromToPersonName = createString("fromToPersonName");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final DatePath<java.time.LocalDate> inBankDate = createDate("inBankDate", java.time.LocalDate.class);

    public final StringPath side = createString("side");

    public final NumberPath<Long> subCategoryId = createNumber("subCategoryId", Long.class);

    public final StringPath tag = createString("tag");

    public final com.querydsl.sql.PrimaryKey<Transactions> primary = createPrimaryKey(id);

    public final com.querydsl.sql.ForeignKey<Accounts> bkyTransactionsIbfk1 = createForeignKey(accountId, "id");

    public final com.querydsl.sql.ForeignKey<SubCategory> bkyTransactionsIbfk2 = createForeignKey(subCategoryId, "id");

    public QTransactions(String variable) {
        super(Transactions.class, forVariable(variable), "null", "bky_transactions");
        addMetadata();
    }

    public QTransactions(String variable, String schema, String table) {
        super(Transactions.class, forVariable(variable), schema, table);
        addMetadata();
    }

    public QTransactions(String variable, String schema) {
        super(Transactions.class, forVariable(variable), schema, "bky_transactions");
        addMetadata();
    }

    public QTransactions(Path<? extends Transactions> path) {
        super(path.getType(), path.getMetadata(), "null", "bky_transactions");
        addMetadata();
    }

    public QTransactions(PathMetadata metadata) {
        super(Transactions.class, metadata, "null", "bky_transactions");
        addMetadata();
    }

    public void addMetadata() {
        addMetadata(accountId, ColumnMetadata.named("account_id").withIndex(5).ofType(Types.BIGINT).withSize(19).notNull());
        addMetadata(amount, ColumnMetadata.named("amount").withIndex(4).ofType(Types.DECIMAL).withSize(15).withDigits(3).notNull());
        addMetadata(comment, ColumnMetadata.named("comment").withIndex(8).ofType(Types.VARCHAR).withSize(255));
        addMetadata(date, ColumnMetadata.named("date").withIndex(2).ofType(Types.DATE).withSize(10).notNull());
        addMetadata(fromToPersonName, ColumnMetadata.named("from_to_person_name").withIndex(6).ofType(Types.VARCHAR).withSize(255).notNull());
        addMetadata(id, ColumnMetadata.named("id").withIndex(1).ofType(Types.BIGINT).withSize(19).notNull());
        addMetadata(inBankDate, ColumnMetadata.named("in_bank_date").withIndex(3).ofType(Types.DATE).withSize(10));
        addMetadata(side, ColumnMetadata.named("side").withIndex(10).ofType(Types.VARCHAR).withSize(255).notNull());
        addMetadata(subCategoryId, ColumnMetadata.named("sub_category_id").withIndex(7).ofType(Types.BIGINT).withSize(19).notNull());
        addMetadata(tag, ColumnMetadata.named("tag").withIndex(9).ofType(Types.VARCHAR).withSize(255));
    }

}

