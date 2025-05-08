import { OrderResponse } from '@api/orders/OrderTypes';
import PaginationLayout from '@components/theme/pagination/PaginationLayout';
import MainSection from '@components/theme/sections/MainSection';
import useHandlePagination from '@hooks/use-handle-pagination/useHandlePagination';
import OrdersService from '@services/orders/OrdersService';
import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import OrdersTable from './table/OrdersTable';

/**
 * Orders page component that displays a list of market orders with pagination
 */
export default function Orders() {
  const ordersService: OrdersService = getGlobalInstance(OrdersService);

  const {
    elements: orders,
    currentPage,
    totalPages,
    handlePageChange,
  } = useHandlePagination<OrderResponse>(ordersService.fetchOrders);

  return (
    <MainSection>
      <PaginationLayout
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      >
        <OrdersTable orders={orders} />
      </PaginationLayout>
    </MainSection>
  );
}
