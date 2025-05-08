import { CategoryResponse } from '@api/categories/CategoriesTypes';
import CategoriesTable from '@components/pages/parameters/categories/table/CategoriesTable';
import PaginationLayout from '@components/theme/pagination/PaginationLayout';
import MainSection from '@components/theme/sections/MainSection';
import useHandlePagination from '@hooks/use-handle-pagination/useHandlePagination';
import CategoriesService from '@services/categories/CategoriesService';
import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';

/**
 * Categories page component that displays a list of categories
 * with pagination support
 */
export default function Categories() {
  const categoriesService: CategoriesService = getGlobalInstance(CategoriesService);

  const {
    elements: categories,
    currentPage,
    totalPages,
    handlePageChange,
  } = useHandlePagination<CategoryResponse>(categoriesService.fetchPaginatedCategories);

  return (
    <MainSection>
      <PaginationLayout
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      >
        <CategoriesTable categories={categories} />
      </PaginationLayout>
    </MainSection>
  );
}
