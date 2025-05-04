import { PaginatedResponse } from '@/utils/types/PaginationTypes';
import { useOnComponentMounted } from '@lib/react-hooks-alias/ReactHooksAlias';
import { useState } from 'react';
import { HttpPromise } from 'simple-http-rest-client';

/**
 * A hook that handles pagination state and data fetching.
 * It manages the current page, total pages, and paginated data.
 * 
 * @template T The type of elements in the paginated response
 * @param fetchElements A function that fetches paginated data
 * @param defaultPage The initial page number (defaults to 1)
 * @param defaultSize The page size (defaults to 20)
 * @param onError Optional callback for error handling
 * @returns Pagination state and handlers
 */
export default function useHandlePagination<T>(
  fetchElements: (page: number, size: number) => HttpPromise<PaginatedResponse<T>>,
) {
  const defaultPage = 1;
  const defaultSize = 20;

  const [elements, setElements] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(defaultPage);
  const [totalPages, setTotalPages] = useState<number>(defaultPage);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageSize] = useState<number>(defaultSize);

  const fetchPagedData = (page: number) => {
    setIsLoading(true);
    fetchElements(page, pageSize)
      .then((response: PaginatedResponse<T>) => {
        setElements(response.content);
        setTotalPages(response.pagination.totalPages);
        setCurrentPage(response.pagination.currentPage);
      });
  };

  useOnComponentMounted(() => {
    fetchPagedData(currentPage);
  });

  const handlePageChange = (page: number) => {
    fetchPagedData(page);
  };

  return {
    elements,
    currentPage,
    totalPages,
    isLoading,
    handlePageChange,
  };
}