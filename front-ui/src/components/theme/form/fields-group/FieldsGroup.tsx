import React, { PropsWithChildren } from 'react';

type FieldsGroupProps = PropsWithChildren<{
  columns?: number,
}>;

export default function FieldsGroup({ children, columns = 2 }: FieldsGroupProps) {
  return (
    <div className={`grid grid-cols-${columns} gap-4`}>
      {children}
    </div>
  );
}