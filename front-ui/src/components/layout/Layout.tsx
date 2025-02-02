import GlobalErrorBoundary from '@components/theme/GlobalErrorBoundary';
import {
  Sidebar, SidebarContent,
  SidebarFooter, SidebarGroup,
  SidebarGroupContent, SidebarGroupLabel, SidebarHeader,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger,
} from '@lib/shadcn/sidebar';
import React, { ReactNode } from 'react';
import { ScrollRestoration } from 'react-router-dom';
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

type Props = {
  children: ReactNode,
};

export default function Layout({ children }: Props) {
  return (
    <GlobalErrorBoundary>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader />
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Application</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a>
                        <Calendar />
                        <span>Test</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter />
        </Sidebar>
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
      <ScrollRestoration />
    </GlobalErrorBoundary>
  );
}
