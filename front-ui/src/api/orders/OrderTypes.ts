import { TickerCategory } from '@api/tickers/TickersTypes';
import { PaginatedResponse } from '@/utils/types/PaginationTypes';

/**
 * Side of the order (BUY or SELL)
 */
export enum OrderSide {
  BUY = 'BUY',
  SELL = 'SELL',
}

/**
 * Represents an order response from the API
 */
export type OrderResponse = {
  id: number,
  date: string,
  amount: string,
  side: OrderSide,
  quantity: number,
  charges: string,
  accountShortName: string,
  accountColor: string,
  tickerShortName: string,
  tickerCategory: TickerCategory,
};

/**
 * Represents the request payload for creating a new order
 */
export type OrderRequest = {
  date: string,
  side: OrderSide,
  amount: string,
  quantity: number,
  charges: string,
  accountId: number,
  tickerId: number,
};

/**
 * Paginated response for orders
 */
export type PaginatedOrdersResponse = PaginatedResponse<OrderResponse>;
