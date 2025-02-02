package banky.db.generated;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;

import com.querydsl.sql.ColumnMetadata;
import java.sql.Types;




/**
 * QCategory is a Querydsl query type for Category
 */
@Generated("com.querydsl.sql.codegen.MetaDataSerializer")
public class QCategory extends com.querydsl.sql.RelationalPathBase<Category> {

    private static final long serialVersionUID = 545521820;

    public static final QCategory category = new QCategory("bky_category");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath name = createString("name");

    public final com.querydsl.sql.PrimaryKey<Category> primary = createPrimaryKey(id);

    public final com.querydsl.sql.ForeignKey<SubCategory> _bkySubCategoryIbfk1 = createInvForeignKey(id, "category_id");

    public QCategory(String variable) {
        super(Category.class, forVariable(variable), "null", "bky_category");
        addMetadata();
    }

    public QCategory(String variable, String schema, String table) {
        super(Category.class, forVariable(variable), schema, table);
        addMetadata();
    }

    public QCategory(String variable, String schema) {
        super(Category.class, forVariable(variable), schema, "bky_category");
        addMetadata();
    }

    public QCategory(Path<? extends Category> path) {
        super(path.getType(), path.getMetadata(), "null", "bky_category");
        addMetadata();
    }

    public QCategory(PathMetadata metadata) {
        super(Category.class, metadata, "null", "bky_category");
        addMetadata();
    }

    public void addMetadata() {
        addMetadata(id, ColumnMetadata.named("id").withIndex(1).ofType(Types.BIGINT).withSize(19).notNull());
        addMetadata(name, ColumnMetadata.named("name").withIndex(2).ofType(Types.VARCHAR).withSize(255).notNull());
    }

}

