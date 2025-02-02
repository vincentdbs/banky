import React from 'react';

type Props = {
  children: string,
};

export default function H2({ children }: Props) {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  );
}
