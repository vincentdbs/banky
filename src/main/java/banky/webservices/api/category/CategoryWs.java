package banky.webservices.api.category;

import banky.services.category.CategoryService;
import banky.webservices.api.category.data.CategoryRequest;
import banky.webservices.api.category.data.CategoryResponse;
import banky.webservices.api.category.data.SubCategoryNamesResponse;
import banky.webservices.api.category.data.SubCategoryRequest;
import banky.webservices.api.category.data.SubCategoryResponse;
import banky.webservices.data.pagination.PaginatedResponse;
import com.coreoz.plume.jersey.errors.Validators;
import com.coreoz.plume.jersey.security.permission.PublicApi;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/categories")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Tag(name = "Categories", description = "Manage categories and subcategories")
@PublicApi
@Singleton
public class CategoryWs {

    private final CategoryService categoryService;
    private static final int DEFAULT_PAGE_SIZE = 20;
    private static final int DEFAULT_PAGE = 1;

    @Inject
    private CategoryWs(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @POST
    @Operation(description = "Create a new category")
    public long createCategory(CategoryRequest request) {
        Validators.checkRequired("name", request.name());
        return categoryService.createCategory(request);
    }

    @GET
    @Operation(description = "Fetch categories with pagination")
    public PaginatedResponse<CategoryResponse> fetchCategories(
        @QueryParam("page") Integer page,
        @QueryParam("size") Integer size
    ) {
        int pageSize = size != null ? size : DEFAULT_PAGE_SIZE;
        int pageNumber = page != null ? page : DEFAULT_PAGE;
        
        return categoryService.fetchPaginatedCategories(pageNumber, pageSize);
    }

    @PUT
    @Path("/{id}")
    @Operation(description = "Update an existing category")
    public void updateCategory(@PathParam("id") Long id, CategoryRequest request) {
        Validators.checkRequired("name", request.name());
        categoryService.updateCategory(id, request);
    }

    @POST
    @Path("/{id}/sub-category")
    @Operation(description = "Create a new subcategory")
    public void createSubCategory(
        @PathParam("id") Long id,
        SubCategoryRequest request
    ) {
        Validators.checkRequired("name", request.name());
        categoryService.createSubCategory(id, request);
    }

    @PUT
    @Path("/{id}/sub-category/{categoryId}")
    @Operation(description = "Update an existing subcategory")
    public void updateSubCategory(
        @PathParam("id") Long id,
        @PathParam("categoryId") Long categoryId,
        SubCategoryRequest request
    ) {
        Validators.checkRequired("name", request.name());
        categoryService.updateSubCategory(id, categoryId, request);
    }

    @GET
    @Path("/{id}/sub-categories")
    @Operation(description = "Fetch subcategories by category id")
    public List<SubCategoryResponse> fetchSubCategoriesByCategoryId(
        @QueryParam("id") Long id
    ) {
        return categoryService.fetchSubCategoriesByCategoryId(id);
    }

    @GET
    @Path("/sub-categories/names")
    @Operation(description = "Fetch subcategories names")
    public List<SubCategoryNamesResponse> fetchSubCategoryNames() {
        return categoryService.fetchSubCategoryNames();
    }

    @GET
    @Path("/sub-categories")
    @Operation(description = "Fetch all subcategories")
    public List<SubCategoryResponse> fetchSubCategories() {
        return categoryService.fetchSubCategories();
    }
}
