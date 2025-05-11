import useFetchAccountNamesChoices
  from '@/hooks/use-fetch-account-names-choices/useFetchAccountNamesChoices';
import useFetchTickerNamesChoices
  from '@/hooks/use-fetch-ticker-names-choices/useFetchTickerNamesChoices';
import { OrderSide } from '@api/orders/OrderTypes';
import Tabs from '@components/theme/tabs/Tabs';
import React from 'react';
import { Control } from 'react-hook-form';
import OrdersFormFields, { OrderFormType } from './fields/OrdersFormFields';
import useMessages from '@i18n/hooks/messagesHook';

type OrdersFormProps = {
  control: Control<OrderFormType>,
  setSide: (side: OrderSide) => void,
};

/**
 * Form for creating a market order
 */
export default function OrdersForm({ control, setSide }: OrdersFormProps) {
  const { messages } = useMessages();

  const { choices: accountsChoices } = useFetchAccountNamesChoices();
  const { choices: tickersChoices } = useFetchTickerNamesChoices();

  return (
    <>
      <Tabs
        leftLabel={messages.message.orderSide[OrderSide.BUY]}
        rightLabel={messages.message.orderSide[OrderSide.SELL]}
        onClickLeft={() => setSide(OrderSide.BUY)}
        onClickRight={() => setSide(OrderSide.SELL)}
      />
      <OrdersFormFields
        control={control}
        accountsChoices={accountsChoices}
        tickersChoices={tickersChoices}
      />
    </>
  );
}