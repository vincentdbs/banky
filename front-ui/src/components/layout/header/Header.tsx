import { Separator } from '@/lib/shadcn/separator';
import { SidebarTrigger } from '@lib/shadcn/sidebar';
import React from 'react';
import useGetCurrentRoute from '@hooks/use-get-current-route/useGetCurrentRoute';
import useMessages from '@i18n/hooks/messagesHook';

/**
 * Header component that displays the current route title and description
 * Uses the useGetCurrentRoute hook to determine the current route
 * and displays the corresponding title and description from translations
 */
export default function Header() {
  // Get the current route
  const { currentRoute } = useGetCurrentRoute();
  // Get translations
  const { messages } = useMessages();

  return (
    <header
      className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div>
          <h1 className="text-base">
            <span className="font-medium">{messages.routeInfo[currentRoute].title}</span>
            <span className="text-muted-foreground"> - {messages.routeInfo[currentRoute].description}</span>
          </h1>
        </div>
      </div>
    </header>
  );
}