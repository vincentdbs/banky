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
import { HttpPromise } from 'simple-http-rest-client';

type OrdersFormModalProps = {
  isOpen: boolean,
  onCancel: () => void,
  defaultValues?: OrderFormType,
  onSubmit?: (values: OrderFormType) => HttpPromise<void>,
  onSubmitSucceeded?: () => void,
};

/**
 * Modal containing a form for creating or editing a market order
 */
export default function OrdersFormModal({ 
  isOpen, 
  onCancel, 
  defaultValues, 
  onSubmit: externalOnSubmit,
  onSubmitSucceeded,
}: OrdersFormModalProps) {
  const ordersService: OrdersService = getGlobalInstance(OrdersService);
  const { messages } = useMessages();
  const [side, setSide] = useState<OrderSide>(
    defaultValues?.[OrderFields.SIDE] || OrderSide.BUY
  );

  const form: UseFormReturn<OrderFormType> = useForm<OrderFormType>({
    defaultValues: defaultValues ?? {
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

  function onSubmit(values: OrderFormType): HttpPromise<void> {
    const orderRequest: CreateOrderRequest = {
      accountId: values[OrderFields.ACCOUNT],
      tickerId: values[OrderFields.TICKER],
      amount: threeDecimalNumberToString(values[OrderFields.AMOUNT]),
      quantity: values[OrderFields.QUANTITY],
      charges: threeDecimalNumberToString(values[OrderFields.CHARGES]),
      date: formatToIsoDate(values[OrderFields.DATE]),
      side: values[OrderFields.SIDE],
    };

    const promiseToMonitor = externalOnSubmit
      ? externalOnSubmit(values)
      : ordersService.createOrder(orderRequest);

    return promiseToMonitor
      .then(() => {
        form.reset();
        onCancel();
        if (onSubmitSucceeded) {
          onSubmitSucceeded();
        }
      })
      .catch((error: Error) => {
        // eslint-disable-next-line no-console
        console.error("Order submission failed", error);
        throw error;
      });
  }

  return (
    <SubmitFormModal<OrderFormType>
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
