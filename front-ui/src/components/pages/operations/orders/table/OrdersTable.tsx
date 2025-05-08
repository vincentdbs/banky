import { OrderResponse, OrderSide } from '@api/orders/OrderTypes';
import useMessages from '@i18n/hooks/messagesHook';
import React from 'react';
import { Badge, BadgeVariant } from '@/lib/shadcn/badge';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/lib/shadcn/table';
import { computeBadgeVariantByTickerCategory } from '@/utils/badge/BadgeUtils';
import { formatToLocaleDate } from '@/utils/dates/DatesUtils';
import { formatEuroDecimalPriceFromString } from '@/utils/number/NumberUtils';

type OrdersTableProps = {
  orders: OrderResponse[],
};

/**
 * A component that displays a table of orders
 */
export default function OrdersTable({ orders }: OrdersTableProps) {
  const { messages } = useMessages();

  /**
   * Get the appropriate badge variant for the order side
   */
  const getSideBadgeVariant = (side: OrderSide): BadgeVariant => {
    switch (side) {
      case OrderSide.BUY:
        return BadgeVariant.LIGHT_RED;
      case OrderSide.SELL:
        return BadgeVariant.LIGHT_GREEN;
      default:
        return BadgeVariant.DEFAULT;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{messages.operations.orders.table.date}</TableHead>
          <TableHead>{messages.operations.orders.table.side}</TableHead>
          <TableHead className="text-right">{messages.operations.orders.table.quantity}</TableHead>
          <TableHead className="text-right">{messages.operations.orders.table.amount}</TableHead>
          <TableHead className="text-right">{messages.operations.orders.table.charges}</TableHead>
          <TableHead>{messages.operations.orders.table.accountName}</TableHead>
          <TableHead>{messages.operations.orders.table.tickerCategory}</TableHead>
          <TableHead>{messages.operations.orders.table.tickerName}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          orders.map((order: OrderResponse) => (
            <TableRow key={order.id}>
              <TableCell>{formatToLocaleDate(order.date)}</TableCell>
              <TableCell>
                <Badge variant={getSideBadgeVariant(order.side)}>
                  {messages.message.orderSide[order.side]}
                </Badge>
              </TableCell>
              <TableCell className="text-right">{order.quantity}</TableCell>
              <TableCell
                className="text-right">{formatEuroDecimalPriceFromString(order.amount)}</TableCell>
              <TableCell
                className="text-right">{formatEuroDecimalPriceFromString(order.charges)}</TableCell>
              <TableCell>
                <p className="font-bold" style={{ color: `#${order.accountColor}` }}>
                  {order.accountShortName}
                </p>
              </TableCell>
              <TableCell>
                <Badge variant={computeBadgeVariantByTickerCategory(order.tickerCategory)}>
                  {messages.message.tickerCategory[order.tickerCategory]}
                </Badge>
              </TableCell>
              <TableCell>{order.tickerShortName}</TableCell>
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
