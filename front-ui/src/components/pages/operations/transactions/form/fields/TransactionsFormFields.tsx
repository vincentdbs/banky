import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/lib/shadcn/form';
import { Input } from '@/lib/shadcn/input';
import { TransactionSide } from '@api/transactions/TransactionsTypes';
import DatePicker from '@components/theme/form/date-picker/DatePicker';
import FieldsGroup from '@components/theme/form/fields-group/FieldsGroup';
import NumberInput from '@components/theme/form/number-input/NumberInput';
import Select from '@components/theme/form/select/Select';
import { Choice } from '@components/theme/form/select/UncontrolledSelect';
import useMessages from '@i18n/hooks/messagesHook';
import { Dayjs } from 'dayjs';
import React from 'react';
import { Control } from 'react-hook-form';

export enum TransactionFields {
  DATE = 'DATE',
  IN_BANK_DATE = 'IN_BANK_DATE',
  AMOUNT = 'AMOUNT',
  ACCOUNT = 'ACCOUNT',
  SIDE = 'SIDE',
  SUBCATEGORY = 'SUBCATEGORY',
  FROM_TO_PERSON = 'FROM_TO_PERSON',
  COMMENT = 'COMMENT',
  TAG = 'TAG',
}

export type TransactionFormType = {
  [TransactionFields.DATE]: Dayjs,
  [TransactionFields.IN_BANK_DATE]?: Dayjs,
  [TransactionFields.AMOUNT]: number,
  [TransactionFields.ACCOUNT]: string,
  [TransactionFields.SIDE]: TransactionSide,
  [TransactionFields.SUBCATEGORY]: string,
  [TransactionFields.FROM_TO_PERSON]: string,
  [TransactionFields.COMMENT]?: string,
  [TransactionFields.TAG]?: string,
}

type TransactionsFormFieldsType = {
  control: Control<TransactionFormType>,
  accountsChoices: Choice[],
  subCategoryChoices: Choice[],
  setAccountValue: (value: string) => void,
  setSubCategoryValue: (value: string) => void,
  side: TransactionSide,
};

export default function TransactionsFormFields(
  {
    control,
    accountsChoices,
    setAccountValue,
    setSubCategoryValue,
    subCategoryChoices,
    side,
  }: TransactionsFormFieldsType,
) {
  const { messages } = useMessages();

  const fromToLabel = side === TransactionSide.DEBIT
    ? messages.operations.transactions.form.fields.to
    : messages.operations.transactions.form.fields.from;

  return (
    <>
      <FormField
        control={control}
        name={TransactionFields.FROM_TO_PERSON}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{fromToLabel}</FormLabel>
            <FormControl>
              <Input
                placeholder={fromToLabel}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FieldsGroup>
        <DatePicker
          control={control}
          name={TransactionFields.DATE}
          label={messages.operations.transactions.form.fields[TransactionFields.DATE]}
        />
        <DatePicker
          control={control}
          name={TransactionFields.IN_BANK_DATE}
          label={messages.operations.transactions.form.fields[TransactionFields.IN_BANK_DATE]}
        />
      </FieldsGroup>
      <FieldsGroup>
        <Select
          control={control}
          name={TransactionFields.ACCOUNT}
          label={messages.operations.transactions.form.fields[TransactionFields.ACCOUNT]}
          choices={accountsChoices}
          setValue={setAccountValue}
        />
        <NumberInput
          control={control}
          name={TransactionFields.AMOUNT}
          label={messages.operations.transactions.form.fields[TransactionFields.AMOUNT]}
          step={0.01}
          min={0}
          displayEuro
        />
      </FieldsGroup>
      <Select
        control={control}
        name={TransactionFields.SUBCATEGORY}
        label={messages.operations.transactions.form.fields[TransactionFields.SUBCATEGORY]}
        choices={subCategoryChoices}
        setValue={setSubCategoryValue}
      />
      <FormField
        control={control}
        name={TransactionFields.COMMENT}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{messages.operations.transactions.form.fields[TransactionFields.COMMENT]}</FormLabel>
            <FormControl>
              <Input
                placeholder={messages.operations.transactions.form.fields[TransactionFields.COMMENT]}
                {...field}
              />
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
              <Input
                placeholder={messages.operations.transactions.form.fields[TransactionFields.TAG]} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
