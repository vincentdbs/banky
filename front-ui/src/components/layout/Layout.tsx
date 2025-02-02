import GlobalErrorBoundary from '@components/theme/GlobalErrorBoundary';
import React, { ReactNode } from 'react';
import { ScrollRestoration } from 'react-router-dom';

type Props = {
  children: ReactNode,
};

export default function Layout({ children }: Props) {
  return (
    <GlobalErrorBoundary>
      {children}
      <ScrollRestoration />
    </GlobalErrorBoundary>
  );
}
