import {
  PARAMETERS,
  PARAMETERS_ACCOUNTS,
  PARAMETERS_CATEGORY,
  PARAMETERS_SUB_CATEGORY,
  PARAMETERS_TICKERS,
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
import { CreditCard, Tag, Tags, BarChart3 } from 'lucide-react';
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
                <Tags />
                <span>{messages.sidebar.parameters.subCategories}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to={`${PARAMETERS}${PARAMETERS_TICKERS}`}>
                <BarChart3 />
                <span>{messages.sidebar.parameters.tickers}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
