import { Button } from '@/lib/shadcn/button';
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
  actionButton?: {
    onClick: () => void,
    label: string,
  },
}>;

export default function PaginationLayout(
  {
    children,
    currentPage,
    totalPages,
    onPageChange,
    actionButton,
  }: PaginationLayoutProps,
) {
  return (
    <>
      <div className="flex justify-between">
        {
          actionButton
          && (
            <Button
              type="button"
              onClick={actionButton.onClick}
            >
              {actionButton.label}
            </Button>
          )
        }
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
      {children}
    </>
  );
}
