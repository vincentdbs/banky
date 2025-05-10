import { TransactionSide } from '@api/transactions/TransactionsTypes';
import {
  TransactionFields,
  TransactionFormType,
} from '@components/pages/operations/transactions/form/fields/TransactionsFormFields';
import SubmitFormModal from '@components/theme/modal/SubmitFormModal';
import useMessages from '@i18n/hooks/messagesHook';
import TransactionsService from '@services/transactions/TransactionsService';
import { formatToIsoDate } from '@utils/dates/DatesUtils';
import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import TransactionsForm from '../form/TransactionsForm';

type TransactionsFormModalProps = {
  isOpen: boolean,
  onCancel: () => void,
}

export default function TransactionsFormModal({ onCancel, isOpen }: TransactionsFormModalProps) {
  const transactionsService: TransactionsService = getGlobalInstance(TransactionsService);

  const { messages } = useMessages();

  const form: UseFormReturn<TransactionFormType> = useForm<TransactionFormType>({
    defaultValues: {
      [TransactionFields.ACCOUNT]: '',
      [TransactionFields.AMOUNT]: 0,
      [TransactionFields.COMMENT]: '',
      [TransactionFields.DATE]: '',
      [TransactionFields.IN_BANK_DATE]: undefined,
      [TransactionFields.FROM_TO_PERSON]: '',
      [TransactionFields.SUBCATEGORY]: '',
      [TransactionFields.TAG]: '',
      [TransactionFields.SIDE]: TransactionSide.DEBIT,
    },
    mode: 'all',
  });

  const currentSide: TransactionSide = form.watch(TransactionFields.SIDE);

  function onSubmit(values: TransactionFormType) {
    transactionsService
      .createTransaction(
        {
          accountId: values[TransactionFields.ACCOUNT],
          amount: values[TransactionFields.AMOUNT],
          comment: values[TransactionFields.COMMENT],
          date: formatToIsoDate(values[TransactionFields.DATE]),
          inBankDate:
            values[TransactionFields.IN_BANK_DATE]
              ? formatToIsoDate(values[TransactionFields.IN_BANK_DATE])
              : undefined,
          fromToPersonName: values[TransactionFields.FROM_TO_PERSON],
          subCategoryId: values[TransactionFields.SUBCATEGORY],
          tag: values[TransactionFields.TAG],
          side: values[TransactionFields.SIDE],
        },
      )
      .then(() => {
        form.reset();
        onCancel();
      });
  }

  return (
    <SubmitFormModal
      form={form}
      onSubmit={onSubmit}
      isOpen={isOpen}
      onCancel={onCancel}
      title={messages.operations.transactions.form.title}
      description={messages.operations.transactions.form.description}
    >
      <TransactionsForm
        control={form.control}
        currentSide={currentSide}
        setSide={(side: TransactionSide) => form.setValue(TransactionFields.SIDE, side)}
      />
    </SubmitFormModal>
  );
}
