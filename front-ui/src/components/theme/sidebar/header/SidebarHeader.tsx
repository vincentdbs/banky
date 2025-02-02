import useMessages from '@i18n/hooks/messagesHook';
import {
  SidebarHeader as SidebarHeaderUi,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@lib/shadcn/sidebar';
import { Landmark } from 'lucide-react';
import React from 'react';

export default function SidebarHeader() {
  const { messages } = useMessages();

  return (
    <SidebarHeaderUi>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" asChild>
            <div>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Landmark className="size-4"/>
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">{messages.title}</span>
              </div>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeaderUi>
  );
}