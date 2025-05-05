import { SubCategoryResponse } from '@api/categories/CategoriesTypes';
import RessourceLayout from '@components/layout/parameters/RessourceLayout';
import useMessages from '@i18n/hooks/messagesHook';
import CategoriesService from '@services/categories/CategoriesService';
import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import SubCategoriesTable from './table/SubCategoriesTable';
import PaginationLayout from '@components/theme/pagination/PaginationLayout';
import useHandlePagination from '@hooks/use-handle-pagination/useHandlePagination';

/**
 * SubCategories page component that displays a list of subcategories
 * with pagination support
 */
export default function SubCategories() {
  const categoriesService: CategoriesService = getGlobalInstance(CategoriesService);
  const { messages } = useMessages();

  const {
    elements: subCategories,
    currentPage,
    totalPages,
    handlePageChange,
  } = useHandlePagination<SubCategoryResponse>(categoriesService.fetchPaginatedSubCategories);

  return (
    <RessourceLayout
      title={messages.parameters.subCategories.title}
      subTitle={messages.parameters.subCategories.subTitle}
    >
      <PaginationLayout
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      >
        <SubCategoriesTable subCategories={subCategories} />
      </PaginationLayout>
    </RessourceLayout>
  );
}
