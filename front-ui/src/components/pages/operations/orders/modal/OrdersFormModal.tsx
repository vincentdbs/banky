import { CreateOrderRequest, OrderSide } from '@api/orders/OrderTypes';
import { OrderFields, OrderFormType } from '@components/pages/operations/orders/form/fields/OrdersFormFields';
import OrdersForm from '@components/pages/operations/orders/form/OrdersForm';
import SubmitFormModal from '@components/theme/modal/SubmitFormModal';
import useMessages from '@i18n/hooks/messagesHook';
import OrdersService from '@services/orders/OrdersService';
import { formatToIsoDate } from '@utils/dates/DatesUtils';
import { threeDecimalNumberToString } from '@utils/number/NumberUtils';
import dayjs from 'dayjs';
import { getGlobalInstance } from 'plume-ts-di';
import React, { useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';

type OrdersFormModalProps = {
  isOpen: boolean,
  onCancel: () => void,
};

/**
 * Modal containing a form for creating a market order
 */
export default function OrdersFormModal({ isOpen, onCancel }: OrdersFormModalProps) {
  const ordersService: OrdersService = getGlobalInstance(OrdersService);
  const { messages } = useMessages();
  const [side, setSide] = useState<OrderSide>(OrderSide.BUY);

  const form: UseFormReturn<OrderFormType> = useForm<OrderFormType>({
    defaultValues: {
      [OrderFields.ACCOUNT]: '',
      [OrderFields.TICKER]: '',
      [OrderFields.AMOUNT]: 0,
      [OrderFields.QUANTITY]: 1,
      [OrderFields.CHARGES]: 0,
      [OrderFields.DATE]: dayjs(),
      [OrderFields.SIDE]: OrderSide.BUY,
    },
    mode: 'all',
  });

  function onSubmit(values: OrderFormType) {
    const orderRequest: CreateOrderRequest = {
      date: formatToIsoDate(values[OrderFields.DATE]),
      side,
      amount: threeDecimalNumberToString(values[OrderFields.AMOUNT]),
      quantity: values[OrderFields.QUANTITY],
      charges: threeDecimalNumberToString(values[OrderFields.CHARGES]),
      accountId: values[OrderFields.ACCOUNT],
      tickerId: values[OrderFields.TICKER],
    };

    ordersService.createOrder(orderRequest).then(() => {
      form.reset();
      onCancel();
    });
  }

  return (
    <SubmitFormModal
      form={form}
      onSubmit={onSubmit}
      isOpen={isOpen}
      onCancel={onCancel}
      title={messages.operations.orders.form.title}
      description={messages.operations.orders.form.description}
    >
      <OrdersForm
        control={form.control}
        setSide={setSide}
      />
    </SubmitFormModal>
  );
}
