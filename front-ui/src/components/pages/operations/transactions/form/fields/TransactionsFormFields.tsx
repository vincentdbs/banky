import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/lib/shadcn/form';
import { Input } from '@/lib/shadcn/input';
import {
  TransactionFormType,
} from '@components/pages/operations/transactions/form/TransactionsForm';
import useMessages from '@i18n/hooks/messagesHook';
import React from 'react';
import { Control } from 'react-hook-form';

export enum TransactionFields {
  DATE = 'date',
  IN_BANK_DATE = 'inBankDate',
  AMOUNT = 'amount',
  ACCOUNT = 'account',
  SIDE = 'side',
  SUBCATEGORY = 'subCategory',
  FROM_TO_PERSON = 'fromToPerson',
  COMMENT = 'comment',
  TAG = 'tag',
}

type TransactionsFormFieldsType = {
  control: Control<TransactionFormType>
}

export default function TransactionsFormFields( { control }: TransactionsFormFieldsType) {
  const { messages } = useMessages();

  return (
    <>
      <FormField
        control={control}
        name={TransactionFields.DATE}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{messages.operations.transactions.form.fields[TransactionFields.DATE]}</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={TransactionFields.AMOUNT}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{messages.operations.transactions.form.fields[TransactionFields.AMOUNT]}</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={TransactionFields.ACCOUNT}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{messages.operations.transactions.form.fields[TransactionFields.ACCOUNT]}</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={TransactionFields.SUBCATEGORY}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{messages.operations.transactions.form.fields[TransactionFields.SUBCATEGORY]}</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={TransactionFields.FROM_TO_PERSON}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{messages.operations.transactions.form.fields[TransactionFields.FROM_TO_PERSON]}</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={TransactionFields.COMMENT}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{messages.operations.transactions.form.fields[TransactionFields.COMMENT]}</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={TransactionFields.TAG}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{messages.operations.transactions.form.fields[TransactionFields.TAG]}</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
