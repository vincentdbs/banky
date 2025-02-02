import React, { useMemo } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Logger } from 'simple-logging-system';
import AppLayout from '@components/layout/app/AppLayout';
import ErrorPage from '@components/pages/error/ErrorPage';
import Home from '@components/pages/home/Home';

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
      ],
    },
  ]), []);

  logger.info('Render App');
  return <RouterProvider router={router} />;
}
