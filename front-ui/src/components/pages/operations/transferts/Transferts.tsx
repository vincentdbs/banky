import { TransfertResponse } from '@api/transferts/TransfertTypes';
import RessourceLayout from '@components/layout/parameters/RessourceLayout';
import useMessages from '@i18n/hooks/messagesHook';
import TransfertsService from '@services/transferts/TransfertsService';
import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import TransfertsFormModal from './modal/TransfertsFormModal';
import TransfertsTable from './table/TransfertsTable';
import PaginationLayout from '@components/theme/pagination/PaginationLayout';
import useHandlePagination from '@hooks/use-handle-pagination/useHandlePagination';

/**
 * Transferts page component that displays a list of transferts between accounts
 * and provides a way to create new ones. Supports pagination for better user experience.
 */
export default function Transferts() {
  const transfertsService: TransfertsService = getGlobalInstance(TransfertsService);
  const { messages, httpError } = useMessages();

  const {
    elements: transferts,
    currentPage,
    totalPages,
    handlePageChange,
  } = useHandlePagination<TransfertResponse>(transfertsService.fetchTransferts);

  return (
    <RessourceLayout
      title={messages.operations.transferts.title}
      subTitle={messages.operations.transferts.subTitle}
    >
      <TransfertsFormModal />
      <PaginationLayout
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      >
        <TransfertsTable transferts={transferts} />
      </PaginationLayout>
    </RessourceLayout>
  );
}
