import useMessages from '@i18n/hooks/messagesHook';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@lib/shadcn/sidebar';
import { CreditCard, Tag } from 'lucide-react';
import React from 'react';

export default function ParametersSidebarGroup() {
  const { messages } = useMessages();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{messages.sidebar.parameters.title}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a>
                <CreditCard />
                <span>{messages.sidebar.parameters.accounts}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a>
                <Tag />
                <span>{messages.sidebar.parameters.categories}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a>
                <Tag />
                <span>{messages.sidebar.parameters.subCategories}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}