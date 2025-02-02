import useMessages from '@i18n/hooks/messagesHook';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@lib/shadcn/sidebar';
import { LayoutDashboard } from 'lucide-react';
import React from 'react';

export default function DashboardSidebarGroup() {
  const { messages } = useMessages();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{messages.sidebar.dashboard.title}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a>
                <LayoutDashboard />
                <span>{messages.sidebar.dashboard.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
