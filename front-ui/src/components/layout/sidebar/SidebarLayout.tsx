import ParametersSidebarGroup from '@components/theme/sidebar/parameters/ParametersSidebarGroup';
import DashboardSidebarGroup from '@components/theme/sidebar/dashboard/DashboardSidebarGroup';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from '@lib/shadcn/sidebar';
import React, { ReactNode } from 'react';

export type SidebarLayout = {
  children: ReactNode;
}

export default function SidebarLayout({children}: SidebarLayout) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
          <DashboardSidebarGroup />
          <ParametersSidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}