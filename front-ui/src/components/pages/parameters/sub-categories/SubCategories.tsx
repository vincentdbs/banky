import { SubCategoryResponse } from '@api/categories/CategoriesTypes';
import PaginationLayout from '@components/theme/pagination/PaginationLayout';
import MainSection from '@components/theme/sections/MainSection';
import useHandlePagination from '@hooks/use-handle-pagination/useHandlePagination';
import CategoriesService from '@services/categories/CategoriesService';
import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import SubCategoriesTable from './table/SubCategoriesTable';

/**
 * SubCategories page component that displays a list of subcategories
 * with pagination support
 */
export default function SubCategories() {
  const categoriesService: CategoriesService = getGlobalInstance(CategoriesService);

  const {
    elements: subCategories,
    currentPage,
    totalPages,
    handlePageChange,
  } = useHandlePagination<SubCategoryResponse>(categoriesService.fetchPaginatedSubCategories);

  return (
    <MainSection>
      <PaginationLayout
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      >
        <SubCategoriesTable subCategories={subCategories} />
      </PaginationLayout>
    </MainSection>
  );
}
