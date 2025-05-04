import { TransactionResponse } from '@api/transactions/TransactionsTypes';
import RessourceLayout from '@components/layout/parameters/RessourceLayout';
import TransactionsFormModal
  from '@components/pages/operations/transactions/modal/TransactionsFormModal';
import TransactionsTable from '@components/pages/operations/transactions/table/TransactionsTable';
import useMessages from '@i18n/hooks/messagesHook';
import { useOnComponentMounted } from '@lib/react-hooks-alias/ReactHooksAlias';
import TransactionsService from '@services/transactions/TransactionsService';
import { getGlobalInstance } from 'plume-ts-di';
import React, { useState } from 'react';

export default function Transactions() {

  return (
    <RessourceLayout
      title={messages.operations.transferts.title}
      subTitle={messages.operations.transferts.subTitle}
    >
      <TransactionsFormModal />
      <TransactionsTable transactions={transactions} />
    </RessourceLayout>
  );
}
