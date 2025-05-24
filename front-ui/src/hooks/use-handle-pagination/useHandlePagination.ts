import useLoader, { LoaderState } from '@lib/plume-http-react-hook-loader/promiseLoaderHook';
import { useOnComponentMounted } from '@lib/react-hooks-alias/ReactHooksAlias';
import { useState } from 'react';
import { HttpPromise } from 'simple-http-rest-client';
import { PaginatedResponse } from '@/utils/types/PaginationTypes';

/**
 * A hook that handles pagination state and data fetching.
 * It manages the current page, total pages, and paginated data.
 *
 * @template T The type of elements in the paginated response
 * @param fetchElements A function that fetches paginated data
 * @returns Pagination state and handlers
 */
export default function useHandlePagination<T>(
  fetchElements: (page: number, size: number) => HttpPromise<PaginatedResponse<T>>,
) {
  const defaultPage: number = 1;
  const defaultSize: number = 20;

  const loader: LoaderState = useLoader();
  const [elements, setElements] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(defaultPage);
  const [totalPages, setTotalPages] = useState<number>(defaultPage);
  const [pageSize] = useState<number>(defaultSize);

  const fetchPagedData = (page: number) => {
    loader.monitor(
      fetchElements(page, pageSize)
        .then((response: PaginatedResponse<T>) => {
          setElements(response.content);
          setTotalPages(response.pagination.totalPages);
          setCurrentPage(response.pagination.currentPage);
        }),
    );
  };

  useOnComponentMounted(() => {
    fetchPagedData(currentPage);
  });

  const handlePageChange = (page: number) => {
    fetchPagedData(page);
  };

  // Function to refresh data for the current page
  const refresh = () => {
    fetchPagedData(currentPage);
  };

  return {
    elements,
    currentPage,
    totalPages,
    isLoading: loader.isLoading,
    handlePageChange,
    refresh,
  };
}
