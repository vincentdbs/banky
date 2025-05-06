import DashboardSidebarGroup
  from '@components/theme/sidebar/groups/dashboard/DashboardSidebarGroup';
import EvolutionSidebarGroup 
  from '@components/theme/sidebar/groups/evolution/EvolutionSidebarGroup';
import OperationsSidebarGroup
  from '@components/theme/sidebar/groups/operations/OperationsSidebarGroup';
import ParametersSidebarGroup
  from '@components/theme/sidebar/groups/parameters/ParametersSidebarGroup';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from '@lib/shadcn/sidebar';
import React, { ReactNode } from 'react';
import SidebarHeader from '@/components/theme/sidebar/header/SidebarHeader';

export type SidebarLayoutProps = {
  children: ReactNode,
};

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
          <DashboardSidebarGroup />
          <OperationsSidebarGroup />
          <EvolutionSidebarGroup />
          <ParametersSidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
      <main className="flex-1">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
