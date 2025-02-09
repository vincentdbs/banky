package banky.integration.categories;

import banky.guice.TestModule;
import banky.services.accounts.AccountsService;
import banky.services.accounts.enums.AccountType;
import banky.services.category.CategoryService;
import com.coreoz.test.GuiceTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

@GuiceTest(TestModule.class)
public class CategoriesTest {
    @Inject
    private CategoryService categoryService;

    @Test
    public void fetchSubCategoryNames__all_result() {
        assertEquals(70, categoryService.fetchSubCategoryNames().size());
    }

    @Test
    public void fetchCategories__all_results() {
        assertEquals(14, categoryService.fetchCategories().size());
    }
}
