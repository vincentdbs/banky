package banky.services.category;

import banky.db.dao.CategoryDao;
import banky.db.dao.SubCategoryDao;
import banky.db.generated.Category;
import banky.db.generated.SubCategory;
import banky.webservices.api.category.data.CategoryRequest;
import banky.webservices.api.category.data.CategoryResponse;
import banky.webservices.api.category.data.SubCategoryNamesResponse;
import banky.webservices.api.category.data.SubCategoryRequest;
import banky.webservices.api.category.data.SubCategoryResponse;

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

    public List<CategoryResponse> fetchCategories() {
        return categoryDao.findAll()
            .stream()
            .map(
                category -> new CategoryResponse(
                    category.getId(),
                    category.getName()
                )
            )
            .toList();
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

    /**
     * Fetches all subcategories regardless of parent category
     * 
     * @return List of all subcategories with their details
     */
    public List<SubCategoryResponse> fetchSubCategories() {
        return subCategoryDao.fetchSubCategories();
    }
}
