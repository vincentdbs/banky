import React, { PropsWithChildren } from 'react';

export default function Text({ children }: PropsWithChildren) {
  return (
    <p className="leading-7 [&:not(:first-child)]:mt-6">
      {children}
    </p>
  );
}
