import { TransactionResponse } from '@api/transactions/TransactionsTypes';
import RessourceLayout from '@components/layout/parameters/RessourceLayout';
import TransactionsTable from '@components/pages/operations/transactions/table/TransactionsTable';
import useMessages from '@i18n/hooks/messagesHook';
import { useOnComponentMounted } from '@lib/react-hooks-alias/ReactHooksAlias';
import TransactionsService from '@services/transactions/TransactionsService';
import { getGlobalInstance } from 'plume-ts-di';
import React, { useState } from 'react';

export default function Transactions() {
  const transactionsService: TransactionsService = getGlobalInstance(TransactionsService);

  const { messages, httpError } = useMessages();
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);

  useOnComponentMounted(() => {
    transactionsService
      .fetchTransactions(0, 20)
      .then(setTransactions)
      .catch(httpError);
  });

  return (
    <RessourceLayout
      title={messages.operations.transactions.title}
      subTitle={messages.operations.transactions.subTitle}
    >
      <TransactionsTable transactions={transactions} />
    </RessourceLayout>
  );
}
