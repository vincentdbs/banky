import React from 'react';

type Props = {
  children: string,
}

export default function H1({ children }: Props) {
  return (
    <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight">
      {children}
    </h1>
  );
}