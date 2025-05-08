import { AccountType } from '@api/accounts/AccountsTypes';
import {
  DashboardAccountsResponse,
  DashboardCheckingAccountResponse,
  DashboardMarketAccountResponse,
  DashboardSavingAccountResponse,
} from '@api/dashboard/DashboardTypes';
import MoneyRecapAccount from '@components/pages/dashboard/accounts/account/MoneyRecapAccount';
import useMessages from '@i18n/hooks/messagesHook';
import useLoader, { LoaderState } from '@lib/plume-http-react-hook-loader/promiseLoaderHook';
import { useOnComponentMounted } from '@lib/react-hooks-alias/ReactHooksAlias';
import {
  Card, CardContent, CardHeader, CardTitle,
} from '@lib/shadcn/card';
import DashboardService from '@services/dashboard/DashboardService';
import { getGlobalInstance } from 'plume-ts-di';
import React, { useState } from 'react';

/**
 * Component that displays a summary of all accounts in the dashboard.
 * Fetches account data from the dashboard service and displays it using MoneyRecapAccount components.
 */
export default function MoneyRecapAccounts() {
  const dashboardService: DashboardService = getGlobalInstance(DashboardService);

  const { messages } = useMessages();
  const dashboardAccountsLoader: LoaderState = useLoader();
  const [accounts, setAccounts] = useState<DashboardAccountsResponse | null>(null);

  useOnComponentMounted(() => {
    // Load the dashboard accounts data
    dashboardAccountsLoader
      .monitor(
        dashboardService.fetchDashboardAccounts()
          .then(setAccounts),
      );
  });

  return (
    <Card className="h-fit row-span-2 h-full">
      <CardHeader>
        <CardTitle>{messages.common.accounts}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-start gap-2">
        {dashboardAccountsLoader.isLoaded && accounts && (
          <>
            {/* TODO à traduire */}
            <p>Comptes</p>
            {
              accounts.checkingAccounts.map((account: DashboardCheckingAccountResponse) => (
                <MoneyRecapAccount
                  key={account.id}
                  color={account.colorCode}
                  name={account.name}
                  shortName={account.shortName}
                  amount={account.totalAmount}
                  subAmount={account.inBankAmount}
                  type={AccountType.CHECKING}
                />
              ))
            }
          </>
        )}
      </CardContent>
      <CardContent className="flex flex-col items-start gap-2">
        {dashboardAccountsLoader.isLoaded && accounts && (
          <>
            {/* TODO à traduire */}
            <p>Éparnes</p>
            {
              accounts.savingsAccounts.map((account: DashboardSavingAccountResponse) => (
                <MoneyRecapAccount
                  key={account.id}
                  color={account.colorCode}
                  name={account.name}
                  shortName={account.shortName}
                  amount={account.totalAmount}
                  subAmount={account.interestAmount}
                  type={AccountType.SAVINGS}
                />
              ))
            }
          </>
        )}
      </CardContent>
      <CardContent className="flex flex-col items-start gap-2">
        {dashboardAccountsLoader.isLoaded && accounts && (
          <>
            {/* TODO à traduire */}
            <p>Bourse</p>
            {
              accounts.marketAccounts.map((account: DashboardMarketAccountResponse) => (
                <MoneyRecapAccount
                  key={account.id}
                  color={account.colorCode}
                  name={account.name}
                  shortName={account.shortName}
                  amount={account.totalAmount}
                  type={AccountType.MARKET}
                />
              ))
            }
          </>
        )}
      </CardContent>
    </Card>
  );
}
