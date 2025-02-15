import React, { PropsWithChildren } from 'react';

export default function Caption({ children }: PropsWithChildren) {
  return (
    <p className="text-xl text-muted-foreground">
      {children}
    </p>
  );
}
