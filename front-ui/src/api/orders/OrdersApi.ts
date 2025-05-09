import ApiHttpClient from '@api/ApiHttpClient';
import { HttpMethod } from 'simple-http-request-builder';
import { HttpPromise } from 'simple-http-rest-client';
import { OrderRequest, PaginatedOrdersResponse } from './OrderTypes';

/**
 * API service for handling market orders
 */
export default class OrdersApi {
  private static BASE_PATH: string = '/orders';

  constructor(private readonly apiHttpClient: ApiHttpClient) {}

  /**
   * Fetches orders with pagination support
   *
   * @param page The page number to retrieve
   * @param size The number of items per page
   * @returns A paginated response containing orders and pagination metadata
   */
  fetchOrders(page: number, size: number): HttpPromise<PaginatedOrdersResponse> {
    return this.apiHttpClient
      .restRequest<PaginatedOrdersResponse>(HttpMethod.GET, OrdersApi.BASE_PATH)
      .queryParams(
        [
          ['page', page],
          ['size', size],
        ],
      )
      .execute();
  }

  /**
   * Creates a new market order
   *
   * @param request The order request details
   * @returns A promise containing the ID of the created order
   */
  createOrder(request: OrderRequest): HttpPromise<number> {
    return this.apiHttpClient
      .restRequest<number>(HttpMethod.POST, OrdersApi.BASE_PATH)
      .jsonBody(request)
      .execute();
  }
}
