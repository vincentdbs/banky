import {
  PARAMETERS,
  PARAMETERS_ACCOUNTS,
  PARAMETERS_CATEGORY,
  PARAMETERS_SUB_CATEGORY,
} from '@components/Routes';
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
import { Link } from 'react-router-dom';

export default function ParametersSidebarGroup() {
  const { messages } = useMessages();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{messages.sidebar.parameters.title}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to={`${PARAMETERS}${PARAMETERS_ACCOUNTS}`}>
                <CreditCard />
                <span>{messages.sidebar.parameters.accounts}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to={`${PARAMETERS}${PARAMETERS_CATEGORY}`}>
                <Tag />
                <span>{messages.sidebar.parameters.categories}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to={`${PARAMETERS}${PARAMETERS_SUB_CATEGORY}`}>
                <Tag />
                <span>{messages.sidebar.parameters.subCategories}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
