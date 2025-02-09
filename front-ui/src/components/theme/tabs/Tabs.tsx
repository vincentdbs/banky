import React, { useState } from 'react';

type TabsTestProps = {
  leftLabel: string,
  rightLabel: string,
  onClickLeft: () => void,
  onClickRight: () => void,
}

export default function TabsTest(
  {
    leftLabel,
    rightLabel,
    onClickLeft,
    onClickRight,
  }: TabsTestProps,
) {
  const [isLeftActive, setIsLeftActive] = useState<boolean>(true);

  const handleClickLeft = () => {
    setIsLeftActive(true);
    onClickLeft();
  };

  const handleClickRight = () => {
    setIsLeftActive(false);
    onClickRight();
  };

  return (
    <div
      role="tablist" aria-orientation="horizontal"
      className="h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground grid w-full grid-cols-2"
      tabIndex={0} data-orientation="horizontal"
      style={{ outline: 'none' }}
    >
      <button
        onClick={handleClickLeft}
        type="button" role="tab"
        aria-selected={isLeftActive ? 'true' : 'false'}
        data-state={isLeftActive ? 'active' : 'inactive'}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
        tabIndex={-1}
        data-orientation="horizontal"
        data-radix-collection-item=""
      >
        {leftLabel}
      </button>
      <button
        onClick={handleClickRight}
        type="button"
        role="tab"
        aria-selected={isLeftActive ? 'false' : 'true'}
        data-state={isLeftActive ? 'inactive' : 'active'}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
        tabIndex={0}
        data-orientation="horizontal"
        data-radix-collection-item=""
      >
        {rightLabel}
      </button>
    </div>
  );
}