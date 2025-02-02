import { Separator } from '@/lib/shadcn/separator';
import MainSection from '@components/theme/sections/MainSection';
import Caption from '@components/theme/typography/Caption';
import H1 from '@components/theme/typography/H1';
import React, { ReactNode } from 'react';

type ParametersLayoutProps = {
  children: ReactNode,
  title: string,
  subTitle: string,
};

export default function ParametersLayout(
  {
    children,
    title,
    subTitle,
  }: ParametersLayoutProps,
) {
  return (
    <MainSection>
      <H1>{title}</H1>
      <Caption>{subTitle}</Caption>
      <Separator className="mt-5" />
      {children}
    </MainSection>
  );
}
