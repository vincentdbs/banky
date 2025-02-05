import { cn } from '@lib/shadcn/utils';
import React, { PropsWithChildren } from 'react';

export type ColoredIconsWrapperProps = PropsWithChildren<{
  colorClassName?: string;
  backgroundColorInlineStyle?: string;
}>;

export const ICON_SIZE = 'size-5';

export default function ColoredIconsWrapper(
  {
    children,
    colorClassName,
    backgroundColorInlineStyle,
  }: ColoredIconsWrapperProps,
) {
  return (
    <div
      className={
        cn(
          'flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground',
          colorClassName,
        )
      }
      style={
        backgroundColorInlineStyle
          ? {
            backgroundColor: backgroundColorInlineStyle,
          }
          : undefined
      }
    >
      {children}
    </div>
  );
}