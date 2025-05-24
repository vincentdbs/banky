import { TransactionResponse } from '@api/transactions/TransactionsTypes';
import CreateTransactionFormModal
  from '@components/pages/operations/transactions/modal/CreateTransactionFormModal';
import TransactionsTable from '@components/pages/operations/transactions/table/TransactionsTable';
import PaginationLayout from '@components/theme/pagination/PaginationLayout';
import MainSection from '@components/theme/sections/MainSection';
import useHandlePagination from '@hooks/use-handle-pagination/useHandlePagination';
import useMessages from '@i18n/hooks/messagesHook';
import TransactionsService from '@services/transactions/TransactionsService';
import { getGlobalInstance } from 'plume-ts-di';
import React, { useState } from 'react';

/**
 * Transactions page component that displays a list of transactions with pagination.
 * Users can navigate through the transaction data and create new transactions.
 */
export default function Transactions() {
  const transactionsService: TransactionsService = getGlobalInstance(TransactionsService);

  const { messages } = useMessages();

  const [isModalDisplayed, setModalDisplayed] = useState(false);

  const {
    elements: transactions,
    currentPage,
    totalPages,
    handlePageChange,
  } = useHandlePagination<TransactionResponse>(transactionsService.fetchTransactions);

  return (
    <MainSection>
      <CreateTransactionFormModal
        isOpen={isModalDisplayed}
        onCancel={() => setModalDisplayed(false)}
      />
      <PaginationLayout
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        actionButton={{
          onClick: () => setModalDisplayed(true),
          label: messages.action.add,
        }}
      >
        <TransactionsTable transactions={transactions} />
      </PaginationLayout>
    </MainSection>
  );
}
