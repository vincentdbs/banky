import { ICON_SIZE_BIG } from '@components/theme/icons/ColoredIconsWrapper';
import { formatEuroDecimalPrice } from '@utils/number/NumberUtils';
import {
  Card, CardContent, CardHeader, CardTitle,
} from '@lib/shadcn/card';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import React from 'react';

type MoneyRecapCardProps = {
  title: string,
  subAmountLine: string,
  amount: number,
  percentage: number,
};

export default function MoneyRecapCard(
  {
    title,
    subAmountLine,
    amount,
    percentage,
  }: MoneyRecapCardProps,
) {
  const isPositive: boolean = percentage > 0;

  return (
    <Card className="h-fit pb-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-normal">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-0 flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold">{formatEuroDecimalPrice(amount)}</p>
          <p className="text-xs text-muted-foreground">{subAmountLine}</p>
        </div>
        {
          isPositive
            ? (
              <ArrowUpRight className={`text-green-500 ${ICON_SIZE_BIG}`} />
            )
            : (
              <ArrowDownRight className={`text-red-500 ${ICON_SIZE_BIG}`} />
            )
        }
      </CardContent>
    </Card>
  );
}
