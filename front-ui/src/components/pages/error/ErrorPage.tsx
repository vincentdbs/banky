import AppLayout from '@components/layout/app/AppLayout';
import React from 'react';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';
import { Logger } from 'simple-logging-system';
import { HOME } from '../../Routes';

const logger: Logger = new Logger('ErrorPage');

export default function ErrorPage() {
  const error: unknown = useRouteError();

  logger.warn('Error page displayed', { error });

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <AppLayout>
        <div>
          <h2>Page not found</h2>
          <div><span>Sorry, we didn&apos;t find this page.&nbsp;</span><Link to={HOME}>Go to the home page</Link></div>
        </div>
      </AppLayout>
    );
  }

  throw error;
}
