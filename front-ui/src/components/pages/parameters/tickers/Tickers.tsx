import { TickerResponse } from '@api/tickers/TickersTypes';
import RessourceLayout from '@components/layout/parameters/RessourceLayout';
import PaginationLayout from '@components/theme/pagination/PaginationLayout';
import useHandlePagination from '@hooks/use-handle-pagination/useHandlePagination';
import useMessages from '@i18n/hooks/messagesHook';
import TickersService from '@services/tickers/TickersService';
import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import TickersTable from './table/TickersTable';

/**
 * Tickers page component that displays a list of financial tickers
 * and provides functionality to create new ones with pagination support
 */
export default function Tickers() {
  const tickersService: TickersService = getGlobalInstance(TickersService);
  const { messages } = useMessages();

  const {
    elements: tickers,
    currentPage,
    totalPages,
    handlePageChange,
  } = useHandlePagination<TickerResponse>(tickersService.fetchTickers);

  return (
    <RessourceLayout
      title={messages.parameters.tickers.title}
      subTitle={messages.parameters.tickers.subTitle}
    >
      <PaginationLayout
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      >
        <TickersTable tickers={tickers} />
      </PaginationLayout>
    </RessourceLayout>
  );
}