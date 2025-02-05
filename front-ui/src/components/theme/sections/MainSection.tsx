import React, { PropsWithChildren } from 'react';

export default function MainSection({ children }: PropsWithChildren) {
  return (
    <section className="p-2 sm:4 lg:p-6">
      {children}
    </section>
  );
}
