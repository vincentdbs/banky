import OrdersApi from '@api/orders/OrdersApi';
import { OrderRequest, PaginatedOrdersResponse } from '@api/orders/OrderTypes';
import { HttpPromise } from 'simple-http-rest-client';

/**
 * OrdersService handles all business logic for market orders.
 * It provides methods for fetching orders and creating new ones.
 */
export default class OrdersService {
  constructor(private readonly ordersApi: OrdersApi) {}

  /**
   * Fetches orders with pagination support
   *
   * @param page The page number (1-based)
   * @param size The number of items per page
   * @returns A promise containing the paginated orders response
   */
  fetchOrders = (page: number, size: number): HttpPromise<PaginatedOrdersResponse> => this.ordersApi.fetchOrders(page, size);

  /**
   * Creates a new market order
   *
   * @param request The order details
   * @returns A promise containing the ID of the created order
   */
  createOrder(request: OrderRequest): HttpPromise<number> {
    return this.ordersApi.createOrder(request);
  }
}
