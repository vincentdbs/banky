import { useLocation } from 'react-router-dom';
import { Routes } from '@/components/Routes';

/**
 * Hook that determines the current route from the URL pathname
 * Provides the current route key and corresponding route display information (title and description)
 *
 * @returns Object containing the current route key and translation keys
 */
export type UseGetCurrentRoute = {
  currentRoute: Routes,
};

export default function useGetCurrentRoute(): UseGetCurrentRoute {
  const { pathname } = useLocation();

  // Find the matching route from the Routes enum
  const currentRoute: Routes = Object.values(Routes).find((route: Routes) => {
    // Exact match
    if (route === pathname) {
      return true;
    }
    // Match for parent routes (e.g., /operations matches /operations/transactions)
    return pathname.startsWith(route) && (
      pathname === route
      || pathname.charAt(route.length) === '/'
    );
  }) || Routes.ROUTE_DASHBOARD; // Default to dashboard if no match

  return {
    currentRoute,
  };
}
