import { TransactionSide } from '@api/transactions/TransactionsTypes';
import {
  TransactionFields,
  TransactionFormType,
} from '@components/pages/operations/transactions/form/fields/TransactionsFormFields';
import SubmitFormModal from '@components/theme/modal/SubmitFormModal';
import useMessages from '@i18n/hooks/messagesHook';
import React from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { HttpPromise } from 'simple-http-rest-client';
import TransactionsForm from '../form/TransactionsForm';

type TransactionsFormModalProps = {
  isOpen: boolean,
  onCancel: () => void,
  defaultValues?: TransactionFormType,
  onSubmit: (values: TransactionFormType) => HttpPromise<void>,
};

/**
 * A modal component for creating or updating transactions.
 * Can be used for both creating new transactions and updating existing ones.
 */
export default function TransactionsFormModal(
  {
    onCancel,
    isOpen,
    defaultValues,
    onSubmit,
  }: TransactionsFormModalProps,
) {
  const { messages } = useMessages();

  const form: UseFormReturn<TransactionFormType> = useForm<TransactionFormType>({
    defaultValues: defaultValues ?? {
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

  const handleSubmit = (values: TransactionFormType) => {
    onSubmit(values).then(() => {
      form.reset();
      onCancel();
    });
  };

  return (
    <SubmitFormModal
      form={form}
      onSubmit={handleSubmit}
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
