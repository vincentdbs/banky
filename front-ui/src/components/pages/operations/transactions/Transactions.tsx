import { TransactionResponse } from '@api/transactions/TransactionsTypes';
import RessourceLayout from '@components/layout/parameters/RessourceLayout';
import TransactionsFormModal
  from '@components/pages/operations/transactions/modal/TransactionsFormModal';
import TransactionsTable from '@components/pages/operations/transactions/table/TransactionsTable';
import PaginationLayout from '@components/theme/pagination/PaginationLayout';
import useHandlePagination from '@hooks/use-handle-pagination/useHandlePagination';
import useMessages from '@i18n/hooks/messagesHook';
import TransactionsService from '@services/transactions/TransactionsService';
import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';

/**
 * Transactions page component that displays a list of transactions with pagination.
 * Users can navigate through the transaction data and create new transactions.
 */
export default function Transactions() {
  const transactionsService: TransactionsService = getGlobalInstance(TransactionsService);
  const { messages } = useMessages();

  const {
    elements: transactions,
    currentPage,
    totalPages,
    handlePageChange,
  } = useHandlePagination<TransactionResponse>(transactionsService.fetchTransactions);

  return (
    <RessourceLayout
      title={messages.operations.transactions.title}
      subTitle={messages.operations.transactions.subTitle}
    >
      <TransactionsFormModal />
      <PaginationLayout
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      >
        <TransactionsTable transactions={transactions} />
      </PaginationLayout>
    </RessourceLayout>
  );
}
