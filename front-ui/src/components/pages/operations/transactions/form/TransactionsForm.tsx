import useFetchAccountNamesChoices
  from '@/hooks/use-fetch-account-names-choices/useFetchAccountNamesChoices';
import useFetchSubCategoryNamesChoices
  from '@/hooks/use-fetch-sub-category-names-choices/useFetchSubCategoryNamesChoices';
import { Button } from '@/lib/shadcn/button';
import { Form } from '@/lib/shadcn/form';
import { formatToIsoDate } from '@/utils/dates/DatesUtils';
import { TransactionSide } from '@api/transactions/TransactionsTypes';
import TabsTest from '@components/theme/tabs/Tabs';
import useMessages from '@i18n/hooks/messagesHook';
import TransactionsService from '@services/transactions/TransactionsService';
import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { undefined } from 'zod';
import TransactionsFormFields, {
  TransactionFields,
  TransactionFormType,
} from './fields/TransactionsFormFields';

export default function TransactionsForm() {
  const transactionsService: TransactionsService = getGlobalInstance(TransactionsService);

  const { messages } = useMessages();
  const { choices: accountsChoices } = useFetchAccountNamesChoices();
  const { choices: subCategoryChoices } = useFetchSubCategoryNamesChoices();

  const defaultSide: TransactionSide = TransactionSide.DEBIT;

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
      [TransactionFields.SIDE]: defaultSide,
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
      );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <TabsTest
          leftLabel={messages.message.side[TransactionSide.DEBIT]}
          rightLabel={messages.message.side[TransactionSide.CREDIT]}
          onClickLeft={() => form.setValue(TransactionFields.SIDE, TransactionSide.DEBIT)}
          onClickRight={() => form.setValue(TransactionFields.SIDE, TransactionSide.CREDIT)}
        />
        <TransactionsFormFields
          side={currentSide}
          setAccountValue={(value: string) => form.setValue(TransactionFields.ACCOUNT, value)}
          setSubCategoryValue={(value: string) => form.setValue(TransactionFields.SUBCATEGORY, value)}
          control={form.control}
          accountsChoices={accountsChoices}
          subCategoryChoices={subCategoryChoices}
        />
        <Button disabled={!form.formState.isValid} className="w-full" type="submit">{messages.action.save}</Button>
      </form>
    </Form>
  );
}
