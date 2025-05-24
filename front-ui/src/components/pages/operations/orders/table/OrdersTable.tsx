import ConfirmationModal from '@/components/theme/modal/ConfirmationModal';
import { Badge, BadgeVariant } from '@/lib/shadcn/badge';
import { Button } from '@/lib/shadcn/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/lib/shadcn/table';
import OrdersService from '@/services/orders/OrdersService';
import { computeBadgeVariantByTickerCategory } from '@/utils/badge/BadgeUtils';
import { formatToLocaleDate } from '@/utils/dates/DatesUtils';
import { formatEuroDecimalPriceFromString } from '@/utils/number/NumberUtils';
import { isNotNullish } from '@/utils/types/TypesUtils';
import { OrderResponse, OrderSide } from '@api/orders/OrderTypes';
import useMessages from '@i18n/hooks/messagesHook';
import { Pencil, Trash2 } from 'lucide-react';
import { getGlobalInstance } from 'plume-ts-di';
import React, { useState } from 'react';

type OrdersTableProps = {
  orders: OrderResponse[],
  onEditOrder?: (order: OrderResponse) => void,
  onOrderDeleted: () => void,
};

/**
 * A component that displays a table of orders
 */
export default function OrdersTable(
  {
    orders,
    onEditOrder,
    onOrderDeleted,
  }: OrdersTableProps,
) {
  const { messages } = useMessages();
  const ordersService: OrdersService = getGlobalInstance(OrdersService);

  // State for deletion confirmation
  const [orderToDelete, setOrderToDelete] = useState<OrderResponse | null>(null);

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

  // Handle delete click
  const handleDeleteClick = (order: OrderResponse) => {
    setOrderToDelete(order);
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    if (orderToDelete) {
      ordersService.deleteOrder(orderToDelete.id)
        .then(() => {
          setOrderToDelete(null);
          onOrderDeleted();
        });
    }
  };

  // Handle cancel delete
  const handleCancelDelete = () => {
    setOrderToDelete(null);
  };

  return (
    <>
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
            <TableHead className="text-right">{messages.operations.orders.table.actions}</TableHead>
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
                  className="text-right">{formatEuroDecimalPriceFromString(order.amount, 3)}</TableCell>
                <TableCell
                  className="text-right">{formatEuroDecimalPriceFromString(order.charges, 3)}</TableCell>
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
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    {onEditOrder && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => onEditOrder(order)}
                      >
                        <Pencil />
                      </Button>
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      className="text-red-500 hover:text-red-600 hover:border-red-200"
                      onClick={() => handleDeleteClick(order)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          }
          {
            orders.length === 0
            && (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-6">
                  {messages.operations.orders.noOrders}
                </TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isNotNullish(orderToDelete)}
        title={messages.operations.orders.delete.confirmTitle}
        description={messages.operations.orders.delete.confirmDescription}
        onCancel={handleCancelDelete}
        onValidate={handleConfirmDelete}
        validateVariant="destructive"
      />
    </>
  );
}
