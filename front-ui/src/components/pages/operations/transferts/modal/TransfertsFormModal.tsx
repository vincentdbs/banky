import { CreateTransfertRequest } from '@api/transferts/TransfertTypes';
import {
  TransfertFields,
  TransfertFormType,
} from '@components/pages/operations/transferts/form/fields/TransfertsFormFields';
import TransfertsForm from '@components/pages/operations/transferts/form/TransfertsForm';
import SubmitFormModal from '@components/theme/modal/SubmitFormModal';
import useMessages from '@i18n/hooks/messagesHook';
import TransfertsService from '@services/transferts/TransfertsService';
import { formatToIsoDate } from '@utils/dates/DatesUtils';
import { twoDecimalNumberToString } from '@utils/number/NumberUtils';
import dayjs from 'dayjs';
import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';

type TransfertsFormModalProps = {
  isOpen: boolean,
  onCancel: () => void,
};

/**
 * Modal containing a form for creating a transfert between accounts
 */
export default function TransfertsFormModal({ isOpen, onCancel }: TransfertsFormModalProps) {
  const transfertsService: TransfertsService = getGlobalInstance(TransfertsService);
  const { messages } = useMessages();

  const form: UseFormReturn<TransfertFormType> = useForm<TransfertFormType>({
    defaultValues: {
      [TransfertFields.FROM_ACCOUNT]: '',
      [TransfertFields.TO_ACCOUNT]: '',
      [TransfertFields.AMOUNT]: 0,
      [TransfertFields.DATE]: dayjs(),
    },
    mode: 'all',
  });

  function onSubmit(values: TransfertFormType) {
    const transfertData: CreateTransfertRequest = {
      fromAccountId: values[TransfertFields.FROM_ACCOUNT],
      toAccountId: values[TransfertFields.TO_ACCOUNT],
      amount: twoDecimalNumberToString(values[TransfertFields.AMOUNT]),
      date: formatToIsoDate(values[TransfertFields.DATE]),
    };

    transfertsService.createTransfert(transfertData).then(() => {
      onCancel();
    });
  }

  return (
    <SubmitFormModal
      form={form}
      onSubmit={onSubmit}
      isOpen={isOpen}
      onCancel={onCancel}
      title={messages.operations.transferts.form.title}
      description={messages.operations.transferts.form.description}
    >
      <TransfertsForm
        control={form.control}
      />
    </SubmitFormModal>
  );
}
