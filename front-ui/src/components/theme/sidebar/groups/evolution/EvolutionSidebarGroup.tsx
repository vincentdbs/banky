import { EVOLUTION, EVOLUTION_MONTHLY_BUDGET } from '@components/Routes';
import useMessages from '@i18n/hooks/messagesHook';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@lib/shadcn/sidebar';
import { BarChart } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Evolution sidebar group component
 * Provides navigation to evolution-related pages
 */
export default function EvolutionSidebarGroup() {
  const { messages } = useMessages();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Evolution</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to={`${EVOLUTION}${EVOLUTION_MONTHLY_BUDGET}`}>
                <BarChart />
                <span>{messages.sidebar.evolution.monthlyBudget}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
