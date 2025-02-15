import { cn } from '@lib/shadcn/utils';
import React, { PropsWithChildren } from 'react';

export default function MainSection({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <section className={cn('p-2 sm:4 lg:p-6', className)}>
      {children}
    </section>
  );
}
