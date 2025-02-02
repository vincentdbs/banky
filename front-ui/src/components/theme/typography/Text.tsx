import React from 'react';

type Props = {
  children: string,
};

export default function Text({ children }: Props) {
  return (
    <p className="leading-7 [&:not(:first-child)]:mt-6">
      {children}
    </p>
  );
}
