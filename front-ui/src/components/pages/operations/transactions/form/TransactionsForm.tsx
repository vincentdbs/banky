import useFetchAccountNamesChoices
  from '@/hooks/use-fetch-account-names-choices/useFetchAccountNamesChoices';
import useFetchSubCategoryNamesChoices
  from '@/hooks/use-fetch-sub-category-names-choices/useFetchSubCategoryNamesChoices';
import { TransactionSide } from '@api/transactions/TransactionsTypes';
import Tabs from '@components/theme/tabs/Tabs';
import useMessages from '@i18n/hooks/messagesHook';
import React from 'react';
import { Control } from 'react-hook-form';
import TransactionsFormFields, { TransactionFormType } from './fields/TransactionsFormFields';

export type TransactionsFormProps = {
  control: Control<TransactionFormType>,
  currentSide: TransactionSide,
  setSide: (value: TransactionSide) => void,
}

export default function TransactionsFormProps(
  {
    control,
    currentSide,
    setSide,
  }: TransactionsFormProps,
) {
  const { messages } = useMessages();
  const { choices: accountsChoices } = useFetchAccountNamesChoices();
  const { choices: subCategoryChoices } = useFetchSubCategoryNamesChoices();

  return (
    <>
      <Tabs
        leftLabel={messages.message.side[TransactionSide.DEBIT]}
        rightLabel={messages.message.side[TransactionSide.CREDIT]}
        onClickLeft={() => setSide(TransactionSide.DEBIT)}
        onClickRight={() => setSide(TransactionSide.CREDIT)}
      />
      <TransactionsFormFields
        side={currentSide}
        control={control}
        accountsChoices={accountsChoices}
        subCategoryChoices={subCategoryChoices}
      />
    </>
  );
}
