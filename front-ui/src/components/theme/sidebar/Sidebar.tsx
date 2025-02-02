import React from 'react';
import { SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, Sidebar as SidebarUi } from '@lib/shadcn/sidebar';

export default function Sidebar() {
  return (
    <SidebarUi>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </SidebarUi>
  );
}