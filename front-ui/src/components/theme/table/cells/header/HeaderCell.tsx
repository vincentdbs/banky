import React, { ReactNode } from 'react';
import BaseCell from '../base/BaseCell';

type HeaderCellProps = {
  children: ReactNode,
  align?: 'left' | 'center' | 'right',
  className?: string,
};

/**
 * Header cell component with light background styling and font weight
 * Used for column headers in tables
 */
export default function HeaderCell({ children, align = 'left', className = '' }: HeaderCellProps) {
  const computeTextAlignClass = (): string => {
    switch (align) {
      case 'left':
        return 'text-left';
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-left';
    }
  };

  return (
    <BaseCell className={`bg-slate-50 font-medium ${computeTextAlignClass()} ${className}`}>
      {children}
    </BaseCell>
  );
}
