import { Switch } from '@lib/shadcn/switch';
import { cn } from '@lib/shadcn/utils';
import React from 'react';

/**
 * LabelledToggle component provides a switch with left and right labels
 * Used for toggling between two states with descriptive labels
 */
type LabelledToggleProps = {
  unCheckedLabel: string,
  checkedLabel: string,
  checked: boolean,
  onToggle: () => void,
  leftClassName?: string,
  rightClassName?: string,
};

export default function LabelledToggle(
  {
    unCheckedLabel,
    checkedLabel,
    checked,
    onToggle,
    leftClassName = '',
    rightClassName = '',
  }: LabelledToggleProps,
) {
  return (
    <div className="flex items-center gap-2">
      <span className={
        cn(
          'text-sm font-medium',
          !checked ? 'text-primary' : 'text-muted-foreground',
          leftClassName,
        )}
      >
        {unCheckedLabel}
      </span>
      <Switch
        checked={checked}
        onCheckedChange={onToggle}
      />
      <span className={
        cn(
          'text-sm font-medium',
          checked ? 'text-primary' : 'text-muted-foreground',
          rightClassName,
        )}
      >
        {checkedLabel}
      </span>
    </div>
  );
}