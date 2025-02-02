import AppLayout from '@components/layout/app/AppLayout';
import ErrorPage from '@components/pages/error/ErrorPage';
import Home from '@components/pages/home/Home';
import { PARAMETERS } from '@components/Routes';
import ParametersRouter from '@components/routes/parameters/ParametersRouter';
import React, { useMemo } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Logger } from 'simple-logging-system';

const logger: Logger = new Logger('App');

export default function App() {
  const router: ReturnType<typeof createBrowserRouter> = useMemo(() => createBrowserRouter([
    {
      path: '/',
      element: <AppLayout><Outlet /></AppLayout>,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: `${PARAMETERS}/*`,
          element: <ParametersRouter />,
        },
      ],
    },
  ]), []);

  logger.info('Render App');
  return <RouterProvider router={router} />;
}
