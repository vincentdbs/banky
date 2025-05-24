import { OrderResponse } from '@api/orders/OrderTypes';
import PaginationLayout from '@components/theme/pagination/PaginationLayout';
import MainSection from '@components/theme/sections/MainSection';
import useHandlePagination from '@hooks/use-handle-pagination/useHandlePagination';
import useMessages from '@i18n/hooks/messagesHook';
import { isNotNullish } from '@utils/types/TypesUtils';
import OrdersService from '@services/orders/OrdersService';
import { getGlobalInstance } from 'plume-ts-di';
import React, { useState } from 'react';
import OrdersFormModal from './modal/OrdersFormModal';
import UpdateOrderFormModal from './modal/UpdateOrderFormModal';
import OrdersTable from './table/OrdersTable';

/**
 * Orders page component that displays a list of market orders with pagination
 * and provides a way to create new ones or edit existing ones.
 */
export default function Orders() {
  const ordersService: OrdersService = getGlobalInstance(OrdersService);
  const { messages } = useMessages();

  const [isCreateModalDisplayed, setCreateModalDisplayed] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState<OrderResponse | null>(null);

  const {
    elements: orders,
    currentPage,
    totalPages,
    handlePageChange,
    // Add refreshData to re-fetch current page data
    refreshData,
  } = useHandlePagination<OrderResponse>(ordersService.fetchOrders);

  const handleOrderDeleted = () => {
    // Refresh data after deletion
    refreshData();
  };

  const handleEditOrder = (order: OrderResponse) => {
    setOrderToEdit(order);
  };

  const handleCancelEdit = () => {
    setOrderToEdit(null);
  };

  const handleSubmitCreate = () => {
    setCreateModalDisplayed(false);
    // Refresh data after creation
    refreshData();
  };

  const handleSubmitEdit = () => {
    setOrderToEdit(null);
    // Refresh data after edit
    refreshData();
  };

  return (
    <MainSection>
      <OrdersFormModal
        isOpen={isCreateModalDisplayed}
        onCancel={() => setCreateModalDisplayed(false)}
        onSubmitSucceeded={handleSubmitCreate}
      />
      {/* Render UpdateOrderFormModal only if orderToEdit is not null */}
      {isNotNullish(orderToEdit) && (
        <UpdateOrderFormModal
          // The key ensures the modal is re-initialized if a different order is edited
          key={orderToEdit.id}
          isOpen={isNotNullish(orderToEdit)}
          order={orderToEdit}
          onCancel={handleCancelEdit}
          onSubmitSucceeded={handleSubmitEdit}
        />
      )}
      <PaginationLayout
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        actionButton={{
          onClick: () => setCreateModalDisplayed(true),
          label: messages.action.add,
        }}
      >
        <OrdersTable
          orders={orders}
          onOrderDeleted={handleOrderDeleted}
          onEditOrder={handleEditOrder} // Corrected prop name
        />
      </PaginationLayout>
    </MainSection>
  );
}
