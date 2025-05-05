import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/lib/shadcn/table';
import {
  formatEuroDecimalPrice,
  formatEuroDecimalPriceFromString,
} from '@/utils/number/NumberUtils';
import { OrderResponse } from '@api/orders/OrderTypes';
import useMessages from '@i18n/hooks/messagesHook';
import { format } from 'date-fns';
import React from 'react';

type OrdersTableProps = {
  orders: OrderResponse[],
};

/**
 * A component that displays a table of orders
 */
export default function OrdersTable({ orders }: OrdersTableProps) {
  const { messages } = useMessages();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{messages.operations.orders.table.date}</TableHead>
          <TableHead>{messages.operations.orders.table.name}</TableHead>
          <TableHead>{messages.operations.orders.table.side}</TableHead>
          <TableHead>{messages.operations.orders.table.quantity}</TableHead>
          <TableHead>{messages.operations.orders.table.amount}</TableHead>
          <TableHead>{messages.operations.orders.table.charges}</TableHead>
          <TableHead>{messages.operations.orders.table.accountName}</TableHead>
          <TableHead>{messages.operations.orders.table.tickerName}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          orders.map((order: OrderResponse) => (
            <TableRow key={order.id}>
              <TableCell>{format(new Date(order.date), 'dd/MM/yyyy')}</TableCell>
              <TableCell>{order.name}</TableCell>
              <TableCell>
                {/*<Badge variant={order.side === OrderSide.BUY ? 'default' : 'destructive'}>*/}
                {/*  {order.side === OrderSide.BUY ? messages.operations.orders.buy : messages.operations.orders.sell}*/}
                {/*</Badge>*/}
              </TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>{formatEuroDecimalPriceFromString(order.amount)}</TableCell>
              <TableCell>{formatEuroDecimalPriceFromString(order.charges)}</TableCell>
              <TableCell>{order.accountName}</TableCell>
              <TableCell>{order.tickerName}</TableCell>
            </TableRow>
          ))
        }
        {
          orders.length === 0
          && (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-6">
                {messages.operations.orders.noOrders}
              </TableCell>
            </TableRow>
          )
        }
      </TableBody>
    </Table>
  );
}