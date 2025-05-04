import useMessages from '@i18n/hooks/messagesHook';
import { Dayjs } from 'dayjs';
import React from 'react';
import { Control } from 'react-hook-form';

export enum TransfertFields {
  FROM_ACCOUNT = 'fromAccount',
  TO_ACCOUNT = 'toAccount',
  AMOUNT = 'amount',
  DATE = 'date',
}

export type TransfertFormType = {
  [TransfertFields.FROM_ACCOUNT]: string,
  [TransfertFields.TO_ACCOUNT]: string,
  [TransfertFields.AMOUNT]: number,
  [TransfertFields.DATE]: Dayjs,
};

type TransfertsFormFieldsProps = {
  control: Control<TransfertFormType>,
  accountsChoices: { value: string, label: string }[],
  setFromAccountValue: (value: string) => void,
  setToAccountValue: (value: string) => void,
};

/**
 * Form fields for creating or editing a transfert
 */
export default function TransfertsFormFields(
  {
    control,
    accountsChoices,
    setFromAccountValue,
    setToAccountValue,
  }: TransfertsFormFieldsProps,
) {
  const { messages } = useMessages();

  return (
    <>
    </>
  );
}