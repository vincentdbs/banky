import dayjs from 'dayjs';
import React from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { getGlobalInstance } from 'plume-ts-di';
import { Form } from '@/lib/shadcn/form';
import { Button } from '@/lib/shadcn/button';
import useMessages from '@i18n/hooks/messagesHook';
import useFetchAccountNamesChoices from '@/hooks/use-fetch-account-names-choices/useFetchAccountNamesChoices';
import { formatToIsoDate } from '@/utils/dates/DatesUtils';
import TransfertsService from '@services/transferts/TransfertsService';
import TransfertsFormFields, { TransfertFields, TransfertFormType } from './fields/TransfertsFormFields';

type TransfertsFormProps = {
  onSuccess?: () => void,
};

/**
 * Form for creating a new transfert between accounts
 */
export default function TransfertsForm({ onSuccess }: TransfertsFormProps) {
  const transfertsService: TransfertsService = getGlobalInstance(TransfertsService);
  const { messages } = useMessages();
  const { choices: accountsChoices } = useFetchAccountNamesChoices();

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
    transfertsService
      .createTransfert({
        fromAccountId: values[TransfertFields.FROM_ACCOUNT],
        toAccountId: values[TransfertFields.TO_ACCOUNT],
        amount: values[TransfertFields.AMOUNT],
        date: formatToIsoDate(values[TransfertFields.DATE]),
      })
      .then(() => {
        if (onSuccess) {
          onSuccess();
        }
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <TransfertsFormFields
          control={form.control}
          accountsChoices={accountsChoices}
          setFromAccountValue={(value: string) => form.setValue(TransfertFields.FROM_ACCOUNT, value)}
          setToAccountValue={(value: string) => form.setValue(TransfertFields.TO_ACCOUNT, value)}
        />
        <Button 
          disabled={!form.formState.isValid} 
          className="w-full" 
          type="submit"
        >
          {messages.action.save}
        </Button>
      </form>
    </Form>
  );
}