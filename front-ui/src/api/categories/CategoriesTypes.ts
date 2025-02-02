export type CategoryResponse = {
  id: string,
  name: string,
};

export type SubCategoryResponse = {
  id: string,
  categoryId: string,
  name: string,
  category: string,
};

export type CategoryRequest = {
  name: string,
};

export type SubCategoryRequest = {
  name: string,
};
