import { OrderResponse } from '@api/orders/OrderTypes';
import {
  OrderFields,
  OrderFormType,
} from '@components/pages/operations/orders/form/fields/OrdersFormFields';
import OrdersService from '@services/orders/OrdersService';
import { formatToIsoDate } from '@utils/dates/DatesUtils';
import { threeDecimalNumberToString } from '@utils/number/NumberUtils';
import dayjs from 'dayjs';
import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import { HttpPromise } from 'simple-http-rest-client';
import OrdersFormModal from './OrdersFormModal';

type UpdateOrderFormModalProps = {
  isOpen: boolean,
  onCancel: () => void,
  order: OrderResponse,
};

/**
 * A modal component for updating existing orders.
 * Wraps the OrdersFormModal with update-specific functionality.
 */
export default function UpdateOrderFormModal(
  {
    isOpen,
    onCancel,
    order,
  }: UpdateOrderFormModalProps,
) {
  const ordersService: OrdersService = getGlobalInstance(OrdersService);

  // Note: OrderResponse contains accountShortName and tickerShortName.
  // The form expects accountId and tickerId for submission.
  // The AutocompleteSelect components in OrdersForm should handle mapping display names to IDs.
  // Therefore, for defaultValues, we use the names, and the form submission will use the IDs.
  const defaultValues: OrderFormType = {
    [OrderFields.ACCOUNT]: order.accountShortName, // This will be used by AutocompleteSelect to find the matching ID
    [OrderFields.TICKER]: order.tickerShortName, // This will be used by AutocompleteSelect to find the matching ID
    [OrderFields.AMOUNT]: parseFloat(order.amount),
    [OrderFields.QUANTITY]: order.quantity,
    [OrderFields.CHARGES]: parseFloat(order.charges),
    [OrderFields.DATE]: dayjs(order.date),
    [OrderFields.SIDE]: order.side,
  };

  const handleSubmit = (values: OrderFormType): HttpPromise<void> => ordersService
    .updateOrder(
      order.id,
      {
        date: formatToIsoDate(values[OrderFields.DATE]),
        side: values[OrderFields.SIDE],
        amount: threeDecimalNumberToString(values[OrderFields.AMOUNT]),
        quantity: values[OrderFields.QUANTITY],
        charges: threeDecimalNumberToString(values[OrderFields.CHARGES]),
        accountId: values[OrderFields.ACCOUNT], // This will be the ID from the form
        tickerId: values[OrderFields.TICKER], // This will be the ID from the form
      },
    ).then(() => {
      onCancel();
    });

  return (
    <OrdersFormModal
      isOpen={isOpen}
      onCancel={onCancel}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
    />
  );
}
