package banky.db.dao;

import banky.db.generated.Category;
import banky.db.generated.QCategory;
import com.coreoz.plume.db.querydsl.crud.CrudDaoQuerydsl;
import com.coreoz.plume.db.querydsl.transaction.TransactionManagerQuerydsl;

import jakarta.inject.Inject;
import jakarta.inject.Singleton;

@Singleton
public class CategoryDao extends CrudDaoQuerydsl<Category> {
    @Inject
    private CategoryDao(TransactionManagerQuerydsl transactionManagerQuerydsl) {
        super(transactionManagerQuerydsl, QCategory.category);
    }
}
