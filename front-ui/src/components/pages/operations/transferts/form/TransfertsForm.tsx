import useFetchAccountNamesChoices
  from '@/hooks/use-fetch-account-names-choices/useFetchAccountNamesChoices';
import React from 'react';
import { Control } from 'react-hook-form';
import TransfertsFormFields, { TransfertFormType } from './fields/TransfertsFormFields';

type TransfertsFormProps = {
  control: Control<TransfertFormType>,
};

/**
 * Form for creating a transfert between accounts
 */
export default function TransfertsForm({ control }: TransfertsFormProps) {
  const { choices: accountsChoices } = useFetchAccountNamesChoices();

  return (
    <TransfertsFormFields
      control={control}
      accountsChoices={accountsChoices}
    />
  );
}
