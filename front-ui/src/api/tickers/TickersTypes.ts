import { PaginatedResponse } from '@/utils/types/PaginationTypes';

export enum TickerCategory {
  CAPITALIZING = 'CAPITALIZING',
  NON_CAPITALIZING = 'NON_CAPITALIZING',
  GUARANTEED = 'GUARANTEED',
  BLOCKED_GUARANTEED = 'BLOCKED_GUARANTEED',
}

/**
 * Types for ticker API interactions
 */
export type TickerResponse = {
  id: string,
  name: string,
  shortName: string,
  category: TickerCategory,
};

export type TickerRequest = {
  name: string,
  shortName: string,
  category: TickerCategory,
};

/**
 * Type for paginated ticker responses
 */
export type PaginatedTickersResponse = PaginatedResponse<TickerResponse>;
