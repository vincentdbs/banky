package banky.db.generated;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;

import com.querydsl.sql.ColumnMetadata;
import java.sql.Types;




/**
 * QSubCategory is a Querydsl query type for SubCategory
 */
@Generated("com.querydsl.sql.codegen.MetaDataSerializer")
public class QSubCategory extends com.querydsl.sql.RelationalPathBase<SubCategory> {

    private static final long serialVersionUID = -688369920;

    public static final QSubCategory subCategory = new QSubCategory("bky_sub_category");

    public final NumberPath<Long> categoryId = createNumber("categoryId", Long.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath name = createString("name");

    public final com.querydsl.sql.PrimaryKey<SubCategory> primary = createPrimaryKey(id);

    public final com.querydsl.sql.ForeignKey<Category> bkySubCategoryIbfk1 = createForeignKey(categoryId, "id");

    public final com.querydsl.sql.ForeignKey<Transactions> _bkyTransactionsIbfk2 = createInvForeignKey(id, "sub_category_id");

    public QSubCategory(String variable) {
        super(SubCategory.class, forVariable(variable), "null", "bky_sub_category");
        addMetadata();
    }

    public QSubCategory(String variable, String schema, String table) {
        super(SubCategory.class, forVariable(variable), schema, table);
        addMetadata();
    }

    public QSubCategory(String variable, String schema) {
        super(SubCategory.class, forVariable(variable), schema, "bky_sub_category");
        addMetadata();
    }

    public QSubCategory(Path<? extends SubCategory> path) {
        super(path.getType(), path.getMetadata(), "null", "bky_sub_category");
        addMetadata();
    }

    public QSubCategory(PathMetadata metadata) {
        super(SubCategory.class, metadata, "null", "bky_sub_category");
        addMetadata();
    }

    public void addMetadata() {
        addMetadata(categoryId, ColumnMetadata.named("category_id").withIndex(3).ofType(Types.BIGINT).withSize(19).notNull());
        addMetadata(id, ColumnMetadata.named("id").withIndex(1).ofType(Types.BIGINT).withSize(19).notNull());
        addMetadata(name, ColumnMetadata.named("name").withIndex(2).ofType(Types.VARCHAR).withSize(255).notNull());
    }

}

