import React, { ReactNode } from 'react';

type BaseCellProps = {
  children: ReactNode,
  className?: string,
};

/**
 * Base cell component with common padding and border styling
 * Used as the foundation for all other cell components
 */
export default function BaseCell({ children, className = '' }: BaseCellProps) {
  return (
    <p className={`p-3 border-b border-r ${className}`}>
      {children}
    </p>
  );
}
