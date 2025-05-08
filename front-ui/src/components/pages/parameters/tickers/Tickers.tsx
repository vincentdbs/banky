import { TickerResponse } from '@api/tickers/TickersTypes';
import PaginationLayout from '@components/theme/pagination/PaginationLayout';
import MainSection from '@components/theme/sections/MainSection';
import useHandlePagination from '@hooks/use-handle-pagination/useHandlePagination';
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

  const {
    elements: tickers,
    currentPage,
    totalPages,
    handlePageChange,
  } = useHandlePagination<TickerResponse>(tickersService.fetchTickers);

  return (
    <MainSection>
      <PaginationLayout
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      >
        <TickersTable tickers={tickers} />
      </PaginationLayout>
    </MainSection>
  );
}
