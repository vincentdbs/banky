package banky.db.dao;

import banky.db.generated.Category;
import banky.db.generated.QCategory;
import banky.db.generated.QSubCategory;
import banky.db.generated.SubCategory;
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

    public List<SubCategoryResponse> fetchSubCategories() {
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
}
