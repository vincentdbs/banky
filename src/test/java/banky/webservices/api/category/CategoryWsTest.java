package banky.webservices.api.category;

import banky.services.category.CategoryService;
import banky.webservices.api.category.data.SubCategoryNamesResponse;
import banky.webservices.api.category.data.SubCategoryResponse;
import banky.webservices.data.pagination.PaginatedResponse;
import banky.webservices.data.pagination.PaginationMeta;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

/**
 * Unit tests for CategoryWs class
 */
@ExtendWith(MockitoExtension.class)
class CategoryWsTest {

    @Mock
    private CategoryService categoryService;

    @InjectMocks
    private CategoryWs categoryWs;

    @Test
    void fetchSubCategories_shouldReturnPaginatedSubCategories_withDefaultPagination() {
        // Arrange
        List<SubCategoryResponse> expectedSubCategories = List.of(
            new SubCategoryResponse(1L, 1L, "Housing", "Expenses"),
            new SubCategoryResponse(2L, 1L, "Food", "Expenses")
        );
        PaginationMeta paginationMeta = new PaginationMeta(1, 4, 70, 20);
        PaginatedResponse<SubCategoryResponse> expectedResponse = 
            new PaginatedResponse<>(expectedSubCategories, paginationMeta);
            
        when(categoryService.fetchPaginatedSubCategories(1, 20)).thenReturn(expectedResponse);

        // Act
        PaginatedResponse<SubCategoryResponse> actualResponse = categoryWs.fetchPaginatedSubCategories(null, null);

        // Assert
        assertThat(actualResponse).isEqualTo(expectedResponse);
        assertThat(actualResponse.content()).isEqualTo(expectedSubCategories);
        assertThat(actualResponse.pagination().currentPage()).isEqualTo(1);
        assertThat(actualResponse.pagination().size()).isEqualTo(20);
    }
    
    @Test
    void fetchSubCategories_shouldReturnPaginatedSubCategories_withCustomPagination() {
        // Arrange
        List<SubCategoryResponse> expectedSubCategories = List.of(
            new SubCategoryResponse(21L, 2L, "Restaurants", "Expenses"),
            new SubCategoryResponse(22L, 2L, "Coffee", "Expenses")
        );
        PaginationMeta paginationMeta = new PaginationMeta(2, 7, 70, 10);
        PaginatedResponse<SubCategoryResponse> expectedResponse = 
            new PaginatedResponse<>(expectedSubCategories, paginationMeta);
            
        when(categoryService.fetchPaginatedSubCategories(2, 10)).thenReturn(expectedResponse);

        // Act
        PaginatedResponse<SubCategoryResponse> actualResponse = categoryWs.fetchPaginatedSubCategories(2, 10);

        // Assert
        assertThat(actualResponse).isEqualTo(expectedResponse);
        assertThat(actualResponse.content()).isEqualTo(expectedSubCategories);
        assertThat(actualResponse.pagination().currentPage()).isEqualTo(2);
        assertThat(actualResponse.pagination().size()).isEqualTo(10);
    }
    
    @Test
    void fetchSubCategoryNames_shouldReturnAllSubCategoryNames() {
        // Arrange
        List<SubCategoryNamesResponse> expectedSubCategoryNames = List.of(
            new SubCategoryNamesResponse(1L, 1L, "Housing"),
            new SubCategoryNamesResponse(2L, 1L, "Food")
        );
            
        when(categoryService.fetchSubCategoryNames()).thenReturn(expectedSubCategoryNames);

        // Act
        List<SubCategoryNamesResponse> actualResponse = categoryWs.fetchSubCategoryNames();

        // Assert
        assertThat(actualResponse).isEqualTo(expectedSubCategoryNames);
    }
}