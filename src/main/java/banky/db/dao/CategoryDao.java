package banky.db.dao;

import banky.db.generated.Category;
import banky.db.generated.QCategory;
import banky.webservices.api.category.data.CategoryResponse;
import com.coreoz.plume.db.querydsl.crud.CrudDaoQuerydsl;
import com.coreoz.plume.db.querydsl.transaction.TransactionManagerQuerydsl;

import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import java.util.List;

@Singleton
public class CategoryDao extends CrudDaoQuerydsl<Category> {
    @Inject
    private CategoryDao(TransactionManagerQuerydsl transactionManagerQuerydsl) {
        super(transactionManagerQuerydsl, QCategory.category);
    }
    
    /**
     * Count the total number of categories
     * 
     * @return The total number of categories
     */
    public long countCategories() {
        return transactionManager
            .selectQuery()
            .select(QCategory.category.count())
            .from(QCategory.category)
            .fetchOne();
    }
    
    /**
     * Fetch categories with pagination
     * 
     * @param page The page number (1-based)
     * @param pageSize The number of items per page
     * @return List of category responses
     */
    public List<CategoryResponse> fetchCategoriesPaginated(int page, int pageSize) {
        int offset = (page - 1) * pageSize;
        
        return transactionManager
            .selectQuery()
            .select(
                QCategory.category.id,
                QCategory.category.name
            )
            .from(QCategory.category)
            .orderBy(QCategory.category.name.asc())
            .offset(offset)
            .limit(pageSize)
            .fetch()
            .stream()
            .map(row -> new CategoryResponse(
                row.get(QCategory.category.id),
                row.get(QCategory.category.name)
            ))
            .toList();
    }
}
