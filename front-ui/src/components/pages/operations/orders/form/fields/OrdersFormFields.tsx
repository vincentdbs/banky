import { OrderSide } from '@api/orders/OrderTypes';
import DatePicker from '@components/theme/form/date-picker/DatePicker';
import FieldsGroup from '@components/theme/form/fields-group/FieldsGroup';
import NumberInput from '@components/theme/form/number-input/NumberInput';
import Select from '@components/theme/form/select/Select';
import { Choice } from '@components/theme/form/select/UncontrolledSelect';
import useMessages from '@i18n/hooks/messagesHook';
import { Dayjs } from 'dayjs';
import React from 'react';
import { Control } from 'react-hook-form';

export enum OrderFields {
  DATE = 'date',
  ACCOUNT = 'account',
  TICKER = 'ticker',
  SIDE = 'side',
  AMOUNT = 'amount',
  QUANTITY = 'quantity',
  CHARGES = 'charges',
}

export type OrderFormType = {
  [OrderFields.DATE]: Dayjs,
  [OrderFields.ACCOUNT]: string,
  [OrderFields.TICKER]: string,
  [OrderFields.SIDE]: OrderSide,
  [OrderFields.AMOUNT]: number,
  [OrderFields.QUANTITY]: number,
  [OrderFields.CHARGES]: number,
};

type OrdersFormFieldsProps = {
  control: Control<OrderFormType>,
  accountsChoices: Choice[],
  tickersChoices: Choice[],
};

/**
 * Form fields for creating or editing an order
 */
export default function OrdersFormFields(
  {
    control,
    accountsChoices,
    tickersChoices,
  }: OrdersFormFieldsProps,
) {
  const { messages } = useMessages();

  return (
    <>
      <DatePicker
        control={control}
        name={OrderFields.DATE}
        label={messages.operations.orders.form.fields[OrderFields.DATE]}
      />
      <FieldsGroup>
        <Select
          control={control}
          name={OrderFields.ACCOUNT}
          label={messages.operations.orders.form.fields[OrderFields.ACCOUNT]}
          choices={accountsChoices}
        />
        <Select
          control={control}
          name={OrderFields.TICKER}
          label={messages.operations.orders.form.fields[OrderFields.TICKER]}
          choices={tickersChoices}
        />
      </FieldsGroup>
      <FieldsGroup>
        <NumberInput
          control={control}
          name={OrderFields.AMOUNT}
          label={messages.operations.orders.form.fields[OrderFields.AMOUNT]}
          step={0.001}
          min={0}
          displayEuro
        />
        <NumberInput
          control={control}
          name={OrderFields.QUANTITY}
          label={messages.operations.orders.form.fields[OrderFields.QUANTITY]}
          step={1}
          min={1}
        />
      </FieldsGroup>
      <NumberInput
        control={control}
        name={OrderFields.CHARGES}
        label={messages.operations.orders.form.fields[OrderFields.CHARGES]}
        step={0.001}
        min={0}
        displayEuro
      />
    </>
  );
}