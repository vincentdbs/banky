import MoneyRecapAccounts
  from '@components/pages/dashboard/accounts/MoneyRecapAccounts';
import { AllAccountCharts } from '@components/pages/dashboard/chart/AllAccountCharts';
import MoneyRecapCards from '@components/pages/dashboard/money-recap-cards/MoneyRecapCards';
import React from 'react';
import MainSection from '@/components/theme/sections/MainSection';

export default function Dashboard() {
  return (
    <MainSection className="grid grid-cols-[17%_17%_17%_17%_1fr] grid-rows-[auto_1fr] gap-4 p-4 items-start h-full">
      <MoneyRecapCards />
      <MoneyRecapAccounts />
      <AllAccountCharts
        data={
          [
            {
              month: 0, color: '#efefef', desktop: 186, mobile: 80, test: 150,
            },
            {
              month: 1, color: '#efefef', desktop: 305, mobile: 200, test: 150,
            },
            {
              month: 2, color: '#efefef', desktop: 237, mobile: 120, test: 150,
            },
            {
              month: 3, color: '#efefef', desktop: 73, mobile: 190, test: 150,
            },
            {
              month: 4, color: '#efefef', desktop: 209, mobile: 130, test: 150,
            },
            {
              month: 5, color: '#efefef', desktop: 214, mobile: 140, test: 150,
            },
          ]
        }
      />
    </MainSection>
  );
}
