import React, { PropsWithChildren } from 'react';
import Pagination from './Pagination';

/**
 * Layout component that displays content with pagination controls.
 * This component is designed to be reused across different paginated features.
 */
type PaginationLayoutProps = PropsWithChildren<{
  currentPage: number,
  totalPages: number,
  onPageChange: (page: number) => void,
}>;

export default function PaginationLayout(
  {
    children,
    currentPage,
    totalPages,
    onPageChange,
  }: PaginationLayoutProps,
) {
  return (
    <div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
      {children}
    </div>
  );
}
