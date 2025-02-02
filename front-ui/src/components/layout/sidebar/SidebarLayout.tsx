import ParametersSidebarGroup from '@components/theme/sidebar/groups/parameters/ParametersSidebarGroup';
import DashboardSidebarGroup from '@components/theme/sidebar/groups/dashboard/DashboardSidebarGroup';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from '@lib/shadcn/sidebar';
import React, { ReactNode } from 'react';
import SidebarHeader from '@/components/theme/sidebar/header/SidebarHeader';

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