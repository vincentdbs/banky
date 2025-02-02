import React from 'react';

type Props = {
  children: string,
};

export default function Caption({ children }: Props) {
  return (
    <p className="text-xl text-muted-foreground">
      {children}
    </p>
  );
}
