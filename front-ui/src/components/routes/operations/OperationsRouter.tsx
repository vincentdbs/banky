import Orders from '@components/pages/operations/orders/Orders';
import Transactions from '@components/pages/operations/transactions/Transactions';
import Transferts from '@components/pages/operations/transferts/Transferts';
import {
  OPERATIONS_ORDERS,
  OPERATIONS_TRANSACTIONS,
  OPERATIONS_TRANSFERT,
  WILD_CARD,
} from '@components/Routes';
import React from 'react';
import { Navigate, useRoutes } from 'react-router';

export default function OperationsRouter() {
  return useRoutes(
    [
      {
        path: OPERATIONS_TRANSACTIONS,
        element: <Transactions />,
      },
      {
        path: OPERATIONS_ORDERS,
        element: <Orders />,
      },
      {
        path: OPERATIONS_TRANSFERT,
        element: <Transferts />,
      },
      {
        path: WILD_CARD,
        element: <Navigate to="/" />,
      },
    ],
  );
}
