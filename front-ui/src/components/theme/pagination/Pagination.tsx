import React from 'react';
import { Button } from '@lib/shadcn/button';
import {
  ChevronFirst, ChevronLast, ChevronLeft, ChevronRight,
} from 'lucide-react';
import useMessages from '@i18n/hooks/messagesHook';

/**
 * Pagination component for navigating through paginated data.
 * Provides first, previous, next, and last page navigation buttons.
 */
type PaginationProps = {
  currentPage: number,
  totalPages: number,
  onPageChange: (page: number) => void,
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const { messages } = useMessages();
  const isFirstPage: boolean = currentPage <= 1;
  const isLastPage: boolean = currentPage >= totalPages;

  const handleGoToFirstPage = () => {
    if (!isFirstPage) {
      onPageChange(1);
    }
  };

  const handleGoToPreviousPage = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleGoToNextPage = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const handleGoToLastPage = () => {
    if (!isLastPage) {
      onPageChange(totalPages);
    }
  };

  return (
    <div className="flex items-center justify-end space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={handleGoToFirstPage}
        disabled={isFirstPage}
      >
        <ChevronFirst className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={handleGoToPreviousPage}
        disabled={isFirstPage}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <p className="text-sm">
        {messages.pagination.pageInfo(currentPage, totalPages)}
      </p>
      <Button
        variant="outline"
        size="icon"
        onClick={handleGoToNextPage}
        disabled={isLastPage}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={handleGoToLastPage}
        disabled={isLastPage}
      >
        <ChevronLast className="h-4 w-4" />
      </Button>
    </div>
  );
}
