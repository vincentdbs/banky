package banky.db.dao;

import banky.db.generated.Category;
import banky.db.generated.QCategory;
import banky.db.generated.QSubCategory;
import banky.db.generated.SubCategory;
import banky.webservices.api.category.data.SubCategoryNamesResponse;
import banky.webservices.api.category.data.SubCategoryResponse;
import com.coreoz.plume.db.querydsl.crud.CrudDaoQuerydsl;
import com.coreoz.plume.db.querydsl.transaction.TransactionManagerQuerydsl;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import java.util.List;

@Singleton
public class SubCategoryDao extends CrudDaoQuerydsl<SubCategory> {
    @Inject
    private SubCategoryDao(TransactionManagerQuerydsl transactionManagerQuerydsl) {
        super(transactionManagerQuerydsl, QSubCategory.subCategory);
    }

    public List<SubCategoryResponse> fetchSubCategoriesByCategoryId(Long categoryId) {
        return transactionManager
            .selectQuery()
            .select(
                QSubCategory.subCategory.id,
                QSubCategory.subCategory.name,
                QSubCategory.subCategory.categoryId,
                QCategory.category.name
            )
            .from(QSubCategory.subCategory)
            .innerJoin(QCategory.category)
            .on(QSubCategory.subCategory.categoryId.eq(QCategory.category.id))
            .orderBy(QSubCategory.subCategory.name.asc())
            .where(QSubCategory.subCategory.categoryId.eq(categoryId))
            .fetch()
            .stream()
            .map(tuple -> new SubCategoryResponse(
                tuple.get(QSubCategory.subCategory.id),
                tuple.get(QSubCategory.subCategory.categoryId),
                tuple.get(QSubCategory.subCategory.name),
                tuple.get(QCategory.category.name)
            ))
            .toList();
    }

        /**
     * Fetches subcategories with pagination support
     * 
     * @param page The page number (1-based)
     * @param size The number of items per page
     * @return A list of subcategories for the requested page
     */
    public List<SubCategoryResponse> fetchSubCategoriesPaginated(int page, int size) {
        int offset = (page - 1) * size; // Convert to 0-based for database query
        
        return transactionManager
            .selectQuery()
            .select(
                QSubCategory.subCategory.id,
                QSubCategory.subCategory.name,
                QSubCategory.subCategory.categoryId,
                QCategory.category.name
            )
            .from(QSubCategory.subCategory)
            .innerJoin(QCategory.category)
            .on(QSubCategory.subCategory.categoryId.eq(QCategory.category.id))
            .offset(offset)
            .limit(size)
            .orderBy(QSubCategory.subCategory.name.asc())
            .fetch()
            .stream()
            .map(tuple -> new SubCategoryResponse(
                tuple.get(QSubCategory.subCategory.id),
                tuple.get(QSubCategory.subCategory.categoryId),
                tuple.get(QSubCategory.subCategory.name),
                tuple.get(QCategory.category.name)
            ))
            .toList();
    }

    /**
     * Count the total number of subcategories in the database
     * 
     * @return The total count of subcategories
     */
    public long countSubCategories() {
        return transactionManager
            .selectQuery()
            .select(QSubCategory.subCategory.count())
            .from(QSubCategory.subCategory)
            .fetchOne();
    }

    public List<SubCategoryNamesResponse> fetchSubCategoryNames() {
        return transactionManager
            .selectQuery()
            .select(
                QSubCategory.subCategory.id,
                QSubCategory.subCategory.categoryId,
                QSubCategory.subCategory.name
            )
            .from(QSubCategory.subCategory)
            .fetch()
            .stream()
            .map(tuple -> new SubCategoryNamesResponse(
                tuple.get(QSubCategory.subCategory.id),
                tuple.get(QSubCategory.subCategory.categoryId),
                tuple.get(QSubCategory.subCategory.name)
            ))
            .toList();
    }
}
