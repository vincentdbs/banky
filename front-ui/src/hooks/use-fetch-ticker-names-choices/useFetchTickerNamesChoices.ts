import { TickerNameResponse } from '@api/tickers/TickersTypes';
import { Choice } from '@components/theme/form/select/AutocompleteUncontrolledSelect';
import { useOnComponentMounted } from '@lib/react-hooks-alias/ReactHooksAlias';
import TickersService from '@services/tickers/TickersService';
import { getGlobalInstance } from 'plume-ts-di';
import { useState } from 'react';

type UseFetchTickerNamesChoices = {
  choices: Choice[],
};

/**
 * Hook to fetch ticker names to be used as choices in select inputs
 * Returns a list of ticker names formatted for use in dropdown components
 */
export default function useFetchTickerNamesChoices(): UseFetchTickerNamesChoices {
  const tickersService: TickersService = getGlobalInstance(TickersService);

  const [tickerNameChoices, setTickerNameChoices] = useState<Choice[]>([]);

  useOnComponentMounted(() => {
    tickersService.fetchTickerNames()
      .then((response: TickerNameResponse[]) => setTickerNameChoices(
        response.map((ticker: TickerNameResponse) => (
          {
            label: ticker.shortName,
            value: ticker.id,
          }
        )),
      ));
  });

  return { choices: tickerNameChoices };
}
