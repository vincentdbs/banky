import useFetchAccountNamesChoices
  from '@/hooks/use-fetch-account-names-choices/useFetchAccountNamesChoices';
import useFetchSubCategoryNamesChoices
  from '@/hooks/use-fetch-sub-category-names-choices/useFetchSubCategoryNamesChoices';
import { Button } from '@/lib/shadcn/button';
import { Form } from '@/lib/shadcn/form';
import { TransactionSide } from '@api/transactions/TransactionsTypes';
import TabsTest from '@components/theme/tabs/Tabs';
import { zodResolver } from '@hookform/resolvers/zod';
import useMessages from '@i18n/hooks/messagesHook';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { undefined, z } from 'zod';
import TransactionsFormFields, { TransactionFields } from './fields/TransactionsFormFields';

// const formSchema = z.object({
//   [TransactionFields.ACCOUNT]: z.string().trim().min(1),
//   [TransactionFields.AMOUNT]: z.number().positive(),
//   [TransactionFields.COMMENT]: z.string().nullable(),
//   [TransactionFields.DATE]: z.string()
//     .refine((value) => dayjs(value, "YYYY-MM-DD", true).isValid(), {
//       message: "Invalid date format. Expected YYYY-MM-DD.",
//     }),
//   [TransactionFields.IN_BANK_DATE]: z.string()
//     .refine((value) => dayjs(value, "YYYY-MM-DD", true).isValid(), {
//       message: "Invalid date format. Expected YYYY-MM-DD.",
//     })
//     .nullish(),
//   [TransactionFields.FROM_TO_PERSON]: z.string(),
//   [TransactionFields.SUBCATEGORY]: z.string(),
//   [TransactionFields.TAG]: z.string().nullish(),
//   [TransactionFields.SIDE]: z.nativeEnum(TransactionSide),
// });


const formSchema = z.object({
  date: z.custom<Dayjs>((val: unknown) => dayjs.isDayjs(val), {
    message: "Date must be a valid Day.js object",
  }),

  inBankDate: z.custom<Dayjs>((val: unknown) => dayjs.isDayjs(val), {
    message: "Date must be a valid Day.js object",
  }),

  amount: z.number().positive("Amount must be a positive number"),

  account: z.string().min(1, "Account is required"), // Corresponds to Long in Java

  side: z.nativeEnum(TransactionSide),

  subCategory: z.string().min(1, "Subcategory is required"), // Corresponds to Long in Java

  fromToPerson: z.string().min(1, "From/To person is required"),

  comment: z.string().optional(),

  tag: z.string().optional(),
});

export type TransactionFormType = z.infer<typeof formSchema>;


export default function TransactionsForm() {
  const { messages } = useMessages();
  const { choices: accountsChoices } = useFetchAccountNamesChoices();
  const { choices: subCategoryChoices } = useFetchSubCategoryNamesChoices();

  const defaultSide: TransactionSide = TransactionSide.DEBIT;

  const form: UseFormReturn<TransactionFormType> = useForm<TransactionFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      [TransactionFields.ACCOUNT]: '',
      [TransactionFields.AMOUNT]: 0,
      [TransactionFields.COMMENT]: '',
      [TransactionFields.DATE]: '',
      [TransactionFields.IN_BANK_DATE]: '',
      [TransactionFields.FROM_TO_PERSON]: '',
      [TransactionFields.SUBCATEGORY]: '',
      [TransactionFields.TAG]: '',
      [TransactionFields.SIDE]: defaultSide,
    },
    mode: 'all',
  });

  const currentSide = form.watch(TransactionFields.SIDE);

  console.log(form.watch());
  console.log(form.formState.errors);

  function onSubmit(values: TransactionFormType) {
    console.log(values);
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
        <Button disabled={!form.formState.isValid} className="w-full" type="submit">Submit</Button>
      </form>
    </Form>
  );
}
