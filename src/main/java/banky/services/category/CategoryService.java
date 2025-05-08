package banky.services.category;

import banky.db.dao.category.CategoryDao;
import banky.db.dao.SubCategoryDao;
import banky.db.generated.Category;
import banky.db.generated.SubCategory;
import banky.webservices.api.category.data.CategoryRequest;
import banky.webservices.api.category.data.CategoryResponse;
import banky.webservices.api.category.data.SubCategoryNamesResponse;
import banky.webservices.api.category.data.SubCategoryRequest;
import banky.webservices.api.category.data.SubCategoryResponse;
import banky.webservices.data.pagination.PaginatedResponse;
import banky.webservices.data.pagination.PaginationMeta;

import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import java.util.List;

@Singleton
public class CategoryService {

    private final CategoryDao categoryDao;
    private final SubCategoryDao subCategoryDao;

    @Inject
    private CategoryService(CategoryDao categoryDao, SubCategoryDao subCategoryDao) {
        this.categoryDao = categoryDao;
        this.subCategoryDao = subCategoryDao;
    }

    /**
     * Fetch categories with pagination support.
     * 
     * @param page The page number to retrieve (1-based)
     * @param size The number of items per page
     * @return A paginated response containing categories and pagination metadata
     */
    public PaginatedResponse<CategoryResponse> fetchPaginatedCategories(int page, int size) {
        // Calculate total elements and pages
        long totalElements = categoryDao.countCategories();
        int totalPages = calculateTotalPages(totalElements, size);
        
        // Ensure page is within bounds
        int adjustedPage = Math.min(Math.max(page, 1), Math.max(totalPages, 1));
        
        // Get categories for the page
        List<CategoryResponse> categories = categoryDao.fetchCategoriesPaginated(adjustedPage, size);
        
        // Create pagination metadata
        PaginationMeta paginationMeta = new PaginationMeta(
            adjustedPage,
            totalPages,
            totalElements,
            size
        );
        
        return new PaginatedResponse<>(categories, paginationMeta);
    }

    /**
     * Fetch subcategories with pagination support.
     * 
     * @param page The page number to retrieve (1-based)
     * @param size The number of items per page
     * @return A paginated response containing subcategories and pagination metadata
     */
    public PaginatedResponse<SubCategoryResponse> fetchPaginatedSubCategories(int page, int size) {
        // Calculate total elements and pages
        long totalElements = subCategoryDao.countSubCategories();
        int totalPages = calculateTotalPages(totalElements, size);
        
        // Ensure page is within bounds
        int adjustedPage = Math.min(Math.max(page, 1), Math.max(totalPages, 1));
        
        // Get subcategories for the page
        List<SubCategoryResponse> subCategories = subCategoryDao.fetchSubCategoriesPaginated(adjustedPage, size);
        
        // Create pagination metadata
        PaginationMeta paginationMeta = new PaginationMeta(
            adjustedPage,
            totalPages,
            totalElements,
            size
        );
        
        return new PaginatedResponse<>(subCategories, paginationMeta);
    }

    public Long createCategory(CategoryRequest request) {
        Category category = new Category();
        category.setName(request.name().trim());
        return categoryDao.save(category).getId();
    }

    public void updateCategory(Long id, CategoryRequest request) {
        Category category = new Category();
        category.setName(request.name().trim());
        category.setId(id);
        categoryDao.save(category);
    }

    public void createSubCategory(Long id, SubCategoryRequest request) {
        SubCategory subCategory = new SubCategory();
        subCategory.setName(request.name());
        subCategory.setCategoryId(id);
        subCategoryDao.save(subCategory);
    }

    public void updateSubCategory(Long categoryId, Long id, SubCategoryRequest request) {
        SubCategory subCategory = new SubCategory();
        subCategory.setName(request.name());
        subCategory.setId(id);
        subCategory.setCategoryId(categoryId);
        subCategoryDao.save(subCategory);
    }

    public List<SubCategoryResponse> fetchSubCategoriesByCategoryId(Long categoryId) {
        return subCategoryDao.fetchSubCategoriesByCategoryId(categoryId);
    }

    public List<SubCategoryNamesResponse> fetchSubCategoryNames() {
        return subCategoryDao.fetchSubCategoryNames();
    }

    private int calculateTotalPages(long totalElements, int pageSize) {
        return (int) Math.ceil((double) totalElements / pageSize);
    }
}
