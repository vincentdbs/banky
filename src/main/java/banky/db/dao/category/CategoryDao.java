package banky.db.dao.category;

import banky.db.dao.category.data.SpentByCategory;
import banky.db.generated.Category;
import banky.db.generated.QCategory;
import banky.db.generated.QSubCategory;
import banky.db.generated.QTransactions;
import banky.services.transactions.enums.TransactionSide;
import banky.webservices.api.category.data.CategoryResponse;
import com.coreoz.plume.db.querydsl.crud.CrudDaoQuerydsl;
import com.coreoz.plume.db.querydsl.transaction.TransactionManagerQuerydsl;

import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import java.math.BigDecimal;
import java.time.LocalDate;
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

    /**
     * Fetch monthly budget data grouped by category showing spent amounts.
     * Only includes DEBIT transactions for the specified month.
     * Categories with no transactions for the month will be included with 0 spent amount.
     *
     * @param firstDayOfTheMonth The first day of the month to fetch data for
     * @return List of monthly budget categories with spent amounts
     */
    public List<SpentByCategory> fetchSpentByCategoryByMonth(LocalDate firstDayOfTheMonth) {
        QTransactions transactions = QTransactions.transactions;
        QCategory category = QCategory.category;
        QSubCategory subCategory = QSubCategory.subCategory;

        // Calculate the last day of the month
        LocalDate lastDayOfTheMonth = firstDayOfTheMonth.plusMonths(1).minusDays(1);

        // Query to fetch all categories and sum transactions if they exist
        return transactionManager
            .selectQuery()
            .select(
                category.name,
                transactions.amount.sum().coalesce(new BigDecimal(0)).as("spent"),
                category.budgetedAmount
            )
            .from(category)
            .leftJoin(subCategory)
            .on(category.id.eq(subCategory.categoryId))
            .leftJoin(transactions)
            .on(
                subCategory.id.eq(transactions.subCategoryId)
                    .and(transactions.side.eq(TransactionSide.DEBIT.name()))
                    .and(transactions.date.goe(firstDayOfTheMonth))
                    .and(transactions.date.loe(lastDayOfTheMonth))
            )
            .groupBy(category.id)
            .orderBy(category.name.asc())
            .fetch()
            .stream()
            .map(tuple -> new SpentByCategory(
                tuple.get(category.name),
                tuple.get(transactions.amount.sum().coalesce(new BigDecimal(0)).as("spent")),
                tuple.get(category.budgetedAmount)
            ))
            .toList();
    }
}
