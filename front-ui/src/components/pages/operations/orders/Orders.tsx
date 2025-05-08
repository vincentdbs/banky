import { OrderResponse } from '@api/orders/OrderTypes';
import RessourceLayout from '@components/layout/parameters/RessourceLayout';
import useMessages from '@i18n/hooks/messagesHook';
import OrdersService from '@services/orders/OrdersService';
import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import PaginationLayout from '@components/theme/pagination/PaginationLayout';
import useHandlePagination from '@hooks/use-handle-pagination/useHandlePagination';
import OrdersTable from './table/OrdersTable';

/**
 * Orders page component that displays a list of market orders with pagination
 */
export default function Orders() {
  const ordersService: OrdersService = getGlobalInstance(OrdersService);
  const { messages } = useMessages();

  const {
    elements: orders,
    currentPage,
    totalPages,
    handlePageChange,
  } = useHandlePagination<OrderResponse>(ordersService.fetchOrders);

  return (
    <RessourceLayout
      title={messages.operations.orders.title}
      subTitle={messages.operations.orders.subTitle}
    >
      <PaginationLayout
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      >
        <OrdersTable orders={orders} />
      </PaginationLayout>
    </RessourceLayout>
  );
}