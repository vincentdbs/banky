package banky.integration.categories;

import banky.guice.TestModule;
import banky.services.accounts.AccountsService;
import banky.services.accounts.enums.AccountType;
import banky.services.category.CategoryService;
import banky.webservices.data.pagination.PaginatedResponse;
import banky.webservices.api.category.data.CategoryResponse;
import com.coreoz.test.GuiceTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

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
    
    @Test
    public void fetchPaginatedCategories__first_page_default_size() {
        // Test first page with default size (20)
        PaginatedResponse<CategoryResponse> response = categoryService.fetchPaginatedCategories(1, 20);
        
        // Verify pagination metadata
        assertNotNull(response);
        assertNotNull(response.pagination());
        assertEquals(1, response.pagination().currentPage());
        assertEquals(20, response.pagination().size());
        
        // There should be 14 total categories based on the non-paginated test
        assertEquals(14, response.pagination().totalElements());
        assertEquals(1, response.pagination().totalPages());
        
        // All categories should be returned since there are only 14 (less than page size)
        assertEquals(14, response.content().size());
    }
    
    @Test
    public void fetchPaginatedCategories__smaller_page_size() {
        // Test with smaller page size to force pagination
        int pageSize = 5;
        PaginatedResponse<CategoryResponse> response = categoryService.fetchPaginatedCategories(1, pageSize);
        
        // Verify pagination metadata
        assertNotNull(response);
        assertNotNull(response.pagination());
        assertEquals(1, response.pagination().currentPage());
        assertEquals(pageSize, response.pagination().size());
        
        // There should be 14 total categories based on the non-paginated test
        assertEquals(14, response.pagination().totalElements());
        assertEquals(3, response.pagination().totalPages()); // 14/5 = 2.8 = 3 pages
        
        // First page should have exactly the page size number of items
        assertEquals(pageSize, response.content().size());
        
        // Test second page
        PaginatedResponse<CategoryResponse> secondPageResponse = categoryService.fetchPaginatedCategories(2, pageSize);
        assertEquals(2, secondPageResponse.pagination().currentPage());
        assertEquals(pageSize, secondPageResponse.content().size());
        
        // Test last page
        PaginatedResponse<CategoryResponse> lastPageResponse = categoryService.fetchPaginatedCategories(3, pageSize);
        assertEquals(3, lastPageResponse.pagination().currentPage());
        assertEquals(4, lastPageResponse.content().size()); // 14 - 5 - 5 = 4 remaining items
    }
}
