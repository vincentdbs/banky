import { OrderResponse } from '@api/orders/OrderTypes';
import PaginationLayout from '@components/theme/pagination/PaginationLayout';
import MainSection from '@components/theme/sections/MainSection';
import useHandlePagination from '@hooks/use-handle-pagination/useHandlePagination';
import useMessages from '@i18n/hooks/messagesHook';
import OrdersService from '@services/orders/OrdersService';
import { getGlobalInstance } from 'plume-ts-di';
import React, { useState } from 'react';
import OrdersFormModal from './modal/OrdersFormModal';
import OrdersTable from './table/OrdersTable';

/**
 * Orders page component that displays a list of market orders with pagination
 * and provides a way to create new ones
 */
export default function Orders() {
  const ordersService: OrdersService = getGlobalInstance(OrdersService);
  const { messages } = useMessages();
  
  const [isModalDisplayed, setModalDisplayed] = useState(false);

  const {
    elements: orders,
    currentPage,
    totalPages,
    handlePageChange,
  } = useHandlePagination<OrderResponse>(ordersService.fetchOrders);

  return (
    <MainSection>
      <OrdersFormModal
        isOpen={isModalDisplayed}
        onCancel={() => setModalDisplayed(false)}
      />
      <PaginationLayout
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        actionButton={{
          onClick: () => setModalDisplayed(true),
          label: messages.action.add,
        }}
      >
        <OrdersTable orders={orders} />
      </PaginationLayout>
    </MainSection>
  );
}
