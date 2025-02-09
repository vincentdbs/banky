import { Button } from '@/lib/shadcn/button';
import { Form } from '@/lib/shadcn/form';
import { TransactionSide } from '@api/transactions/TransactionsTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import TransactionsFormFields, { TransactionFields } from './fields/TransactionsFormFields';

const formSchema = z.object({
  [TransactionFields.ACCOUNT]: z.number(),
  [TransactionFields.AMOUNT]: z.number().positive(),
  [TransactionFields.COMMENT]: z.string().nullable(),
  [TransactionFields.DATE]: z.string(),
  [TransactionFields.IN_BANK_DATE]: z.string().nullable(),
  [TransactionFields.FROM_TO_PERSON]: z.string(),
  [TransactionFields.SIDE]: z.nativeEnum(TransactionSide),
  [TransactionFields.SUBCATEGORY]: z.number(),
  [TransactionFields.TAG]: z.string().nullable(),
})

export type TransactionFormType = z.infer<typeof formSchema>;

export default function TransactionsForm() {
  const form: UseFormReturn<TransactionFormType> = useForm<TransactionFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      [TransactionFields.ACCOUNT]: -1,
      [TransactionFields.AMOUNT]: -1,
      [TransactionFields.COMMENT]: '',
      [TransactionFields.DATE]: '',
      [TransactionFields.IN_BANK_DATE]: null,
      [TransactionFields.FROM_TO_PERSON]: '',
      [TransactionFields.SIDE]: TransactionSide.DEBIT,
      [TransactionFields.SUBCATEGORY]: -1,
      [TransactionFields.TAG]: null,
    },
  })

  function onSubmit(values: TransactionFormType) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <TransactionsFormFields control={form.control} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
