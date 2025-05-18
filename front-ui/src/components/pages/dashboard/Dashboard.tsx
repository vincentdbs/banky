import MoneyRecapAccounts
  from '@components/pages/dashboard/accounts/MoneyRecapAccounts';
import MoneyRecapCards from '@components/pages/dashboard/money-recap-cards/MoneyRecapCards';
import React from 'react';
import MainSection from '@/components/theme/sections/MainSection';

export default function Dashboard() {
  return (
    <MainSection className="grid grid-cols-[17%_17%_17%_17%_1fr] grid-rows-[auto_1fr] gap-4 p-4 items-start h-full">
      <MoneyRecapCards />
      <MoneyRecapAccounts />
    </MainSection>
  );
}
