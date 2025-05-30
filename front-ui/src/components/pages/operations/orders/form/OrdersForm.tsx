import { AccountType } from '@api/accounts/AccountsTypes';
import { OrderSide } from '@api/orders/OrderTypes';
import Tabs from '@components/theme/tabs/Tabs';
import React from 'react';
import { Control } from 'react-hook-form';
import useMessages from '@i18n/hooks/messagesHook';
import OrdersFormFields, { OrderFormType } from './fields/OrdersFormFields';
import useFetchTickerNamesChoices
  from '@/hooks/use-fetch-ticker-names-choices/useFetchTickerNamesChoices';
import useFetchAccountNamesChoices
  from '@/hooks/use-fetch-account-names-choices/useFetchAccountNamesChoices';

type OrdersFormProps = {
  control: Control<OrderFormType>,
  setSide: (side: OrderSide) => void,
};

/**
 * Form for creating a market order
 */
export default function OrdersForm({ control, setSide }: OrdersFormProps) {
  const { messages } = useMessages();

  const { choices: accountsChoices } = useFetchAccountNamesChoices([AccountType.MARKET]);
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
