import React, { ReactNode } from 'react';
import BaseCell from '../base/BaseCell';

type SubHeaderCellProps = {
  children: ReactNode,
  align?: 'left' | 'center' | 'right',
  className?: string,
};

/**
 * Subheader cell component with lighter background styling and font weight
 * Used for subheadings like subtotals in tables
 */
export default function TernaryHeaderCell({ children, align = 'left', className = '' }: SubHeaderCellProps) {
  const computeAlignmentClass = () => {
    switch (align) {
      case 'left':
        return 'text-left';
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return '';
    }
  };

  return (
    <BaseCell className={`bg-slate-200 font-bold ${computeAlignmentClass()} ${className}`}>
      {children}
    </BaseCell>
  );
}
