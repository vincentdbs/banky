import GlobalErrorBoundary from '@components/theme/GlobalErrorBoundary';
import React, { ReactNode } from 'react';
import { ScrollRestoration } from 'react-router-dom';
import SidebarLayout from '../sidebar/SidebarLayout';

type Props = {
  children: ReactNode,
};

export default function AppLayout({ children }: Props) {
  return (
    <GlobalErrorBoundary>
      <SidebarLayout>
        {children}
      </SidebarLayout>
      <ScrollRestoration />
    </GlobalErrorBoundary>
  );
}
