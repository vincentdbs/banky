import React, { PropsWithChildren } from 'react';

export default function MainSection({ children }: PropsWithChildren) {
  return (
    <section className="p-6">
      {children}
    </section>
  );
}
