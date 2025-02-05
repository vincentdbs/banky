import ColoredIconsWrapper, { ICON_SIZE } from '@components/theme/icons/ColoredIconsWrapper';
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
              <ColoredIconsWrapper colorClassName="bg-sidebar-primary">
                <Landmark className={ICON_SIZE} />
              </ColoredIconsWrapper>
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
