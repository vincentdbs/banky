import { TransfertResponse } from '@api/transferts/TransfertTypes';
import RessourceLayout from '@components/layout/parameters/RessourceLayout';
import useMessages from '@i18n/hooks/messagesHook';
import useLoader from '@lib/plume-http-react-hook-loader/promiseLoaderHook';
import { useOnComponentMounted } from '@lib/react-hooks-alias/ReactHooksAlias';
import TransfertsService from '@services/transferts/TransfertsService';
import { getGlobalInstance } from 'plume-ts-di';
import React, { useState } from 'react';
import TransfertsFormModal from './modal/TransfertsFormModal';
import TransfertsTable from './table/TransfertsTable';

/**
 * Transferts page component that displays a list of transferts between accounts
 * and provides a way to create new ones
 */
export default function Transferts() {
  const transfertsService: TransfertsService = getGlobalInstance(TransfertsService);

  const [transferts, setTransferts] = useState<TransfertResponse[]>([]);
  const { messages } = useMessages();

  const loader = useLoader();

  useOnComponentMounted(() => {
    loader.monitor(
      transfertsService.fetchTransferts()
        .then(setTransferts),
    );
  });

  return (
    <RessourceLayout
      title={messages.operations.transferts.title}
      subTitle={messages.operations.transferts.subTitle}
    >
      <TransfertsFormModal />
      <TransfertsTable transferts={transferts} />
    </RessourceLayout>
  );
}
