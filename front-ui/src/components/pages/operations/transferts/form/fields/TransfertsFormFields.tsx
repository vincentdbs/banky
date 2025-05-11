import DatePicker from '@components/theme/form/date-picker/DatePicker';
import FieldsGroup from '@components/theme/form/fields-group/FieldsGroup';
import NumberInput from '@components/theme/form/number-input/NumberInput';
import Select from '@components/theme/form/select/Select';
import { Choice } from '@components/theme/form/select/UncontrolledSelect';
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
  accountsChoices: Choice[],
};

/**
 * Form fields for creating or editing a transfert
 */
export default function TransfertsFormFields(
  {
    control,
    accountsChoices,
  }: TransfertsFormFieldsProps,
) {
  const { messages } = useMessages();

  return (
    <>
      <DatePicker
        control={control}
        name={TransfertFields.DATE}
        label={messages.operations.transferts.form.fields.date}
      />
      <FieldsGroup>
        <Select
          control={control}
          name={TransfertFields.FROM_ACCOUNT}
          label={messages.operations.transferts.form.fields.fromAccount}
          choices={accountsChoices}
        />
        <Select
          control={control}
          name={TransfertFields.TO_ACCOUNT}
          label={messages.operations.transferts.form.fields.toAccount}
          choices={accountsChoices}
        />
      </FieldsGroup>
      <NumberInput
        control={control}
        name={TransfertFields.AMOUNT}
        label={messages.operations.transferts.form.fields.amount}
        step={0.01}
        min={0}
        displayEuro
      />
    </>
  );
}
