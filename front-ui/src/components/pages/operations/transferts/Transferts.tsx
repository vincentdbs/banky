import { TransfertResponse } from '@api/transferts/TransfertTypes';
import PaginationLayout from '@components/theme/pagination/PaginationLayout';
import MainSection from '@components/theme/sections/MainSection';
import useHandlePagination from '@hooks/use-handle-pagination/useHandlePagination';
import TransfertsService from '@services/transferts/TransfertsService';
import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import TransfertsFormModal from './modal/TransfertsFormModal';
import TransfertsTable from './table/TransfertsTable';

/**
 * Transferts page component that displays a list of transferts between accounts
 * and provides a way to create new ones. Supports pagination for better user experience.
 */
export default function Transferts() {
  const transfertsService: TransfertsService = getGlobalInstance(TransfertsService);

  const {
    elements: transferts,
    currentPage,
    totalPages,
    handlePageChange,
  } = useHandlePagination<TransfertResponse>(transfertsService.fetchTransferts);

  return (
    <MainSection>
      <TransfertsFormModal />
      <PaginationLayout
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      >
        <TransfertsTable transferts={transferts} />
      </PaginationLayout>
    </MainSection>
  );
}
