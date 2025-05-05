import Accounts from '@components/pages/parameters/accounts/Accounts';
import Categories from '@components/pages/parameters/categories/Categories';
import SubCategories from '@components/pages/parameters/sub-categories/SubCategories';
import Tickers from '@components/pages/parameters/tickers/Tickers';
import {
  PARAMETERS_ACCOUNTS,
  PARAMETERS_CATEGORY,
  PARAMETERS_SUB_CATEGORY,
  PARAMETERS_TICKERS,
  WILD_CARD,
} from '@components/Routes';
import React from 'react';
import { Navigate, useRoutes } from 'react-router';

export default function ParametersRouter() {
  return useRoutes(
    [
      {
        path: PARAMETERS_ACCOUNTS,
        element: <Accounts />,
      },
      {
        path: PARAMETERS_CATEGORY,
        element: <Categories />,
      },
      {
        path: PARAMETERS_SUB_CATEGORY,
        element: <SubCategories />,
      },
      {
        path: PARAMETERS_TICKERS,
        element: <Tickers />,
      },
      {
        path: WILD_CARD,
        element: <Navigate to="/" />,
      },
    ],
  );
}
