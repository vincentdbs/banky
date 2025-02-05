import {
  OPERATIONS,
  OPERATIONS_ORDERS,
  OPERATIONS_TRANSACTIONS,
  OPERATIONS_TRANSFERT,
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
import { ArrowRightLeft, ChartCandlestick, ShoppingCart } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

export default function OperationsSidebarGroup() {
  const { messages } = useMessages();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{messages.sidebar.operations.title}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to={`${OPERATIONS}${OPERATIONS_TRANSACTIONS}`}>
                <ShoppingCart />
                <span>{messages.sidebar.operations.transactions}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to={`${OPERATIONS}${OPERATIONS_ORDERS}`}>
                <ChartCandlestick />
                <span>{messages.sidebar.operations.orders}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to={`${OPERATIONS}${OPERATIONS_TRANSFERT}`}>
                <ArrowRightLeft />
                <span>{messages.sidebar.operations.transfert}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
