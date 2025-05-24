import { TransactionResponse } from '@api/transactions/TransactionsTypes';
import {
  TransactionFormType,
} from '@components/pages/operations/transactions/form/fields/TransactionsFormFields';
import TransactionsService from '@services/transactions/TransactionsService';
import { formatToIsoDate } from '@utils/dates/DatesUtils';
import { twoDecimalNumberToString } from '@utils/number/NumberUtils';
import dayjs from 'dayjs';
import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import { HttpPromise } from 'simple-http-rest-client';
import TransactionsFormModal from './TransactionsFormModal';

type UpdateTransactionFormModalProps = {
  isOpen: boolean,
  onCancel: () => void,
  transaction: TransactionResponse,
};

/**
 * A modal component for updating existing transactions.
 * Wraps the TransactionsFormModal with update-specific functionality.
 */
export default function UpdateTransactionFormModal(
  {
    isOpen,
    onCancel,
    transaction,
  }: UpdateTransactionFormModalProps,
) {
  const transactionsService: TransactionsService = getGlobalInstance(TransactionsService);

  const defaultValues: TransactionFormType = {
    ACCOUNT: transaction.accountId,
    AMOUNT: transaction.amount,
    COMMENT: transaction.comment,
    DATE: dayjs(transaction.date),
    IN_BANK_DATE: transaction.inBankDate ? dayjs(transaction.inBankDate) : undefined,
    FROM_TO_PERSON: transaction.fromToPersonName || '',
    SUBCATEGORY: transaction.subCategoryId,
    TAG: transaction.tag,
    SIDE: transaction.side,
  };

  const handleSubmit = (values: TransactionFormType): HttpPromise<void> => transactionsService
    .updateTransaction(
      transaction.id,
      {
        accountId: values.ACCOUNT,
        amount: twoDecimalNumberToString(values.AMOUNT),
        comment: values.COMMENT,
        date: formatToIsoDate(values.DATE),
        inBankDate:
            values.IN_BANK_DATE
              ? formatToIsoDate(values.IN_BANK_DATE)
              : undefined,
        fromToPersonName: values.FROM_TO_PERSON,
        subCategoryId: values.SUBCATEGORY,
        tag: values.TAG,
        side: values.SIDE,
      },
    ).then(() => {
      onCancel();
    });

  return (
    <TransactionsFormModal
      isOpen={isOpen}
      onCancel={onCancel}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
    />
  );
}
