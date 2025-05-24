import React from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import { TransactionFormType } from '@components/pages/operations/transactions/form/fields/TransactionsFormFields';
import TransactionsService from '@services/transactions/TransactionsService';
import { formatToIsoDate } from '@utils/dates/DatesUtils';
import { twoDecimalNumberToString } from '@utils/number/NumberUtils';
import { HttpPromise } from 'simple-http-rest-client';
import TransactionsFormModal from './TransactionsFormModal';

/**
 * A modal component for creating new transactions.
 * Wraps the TransactionsFormModal with create-specific functionality.
 */
export default function CreateTransactionFormModal({
  isOpen,
  onCancel,
}: {
  isOpen: boolean,
  onCancel: () => void,
}) {
  const transactionsService: TransactionsService = getGlobalInstance(TransactionsService);

  const handleSubmit = (values: TransactionFormType): HttpPromise<void> => transactionsService
    .createTransaction(
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
    )
    .then(() => { /* Success handler */ });

  return (
    <TransactionsFormModal
      isOpen={isOpen}
      onCancel={onCancel}
      onSubmit={handleSubmit}
    />
  );
}
