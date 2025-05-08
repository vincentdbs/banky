import { BadgeVariant } from '@lib/shadcn/badge';
import { TickerCategory } from '@api/tickers/TickersTypes';

/**
 * Get the appropriate badge variant for the ticker category
 */
export const computeBadgeVariantByTickerCategory = (category: TickerCategory): BadgeVariant => {
  switch (category) {
    case TickerCategory.CAPITALIZING:
      return BadgeVariant.LIGHT_RED;
    case TickerCategory.NON_CAPITALIZING:
      return BadgeVariant.LIGHT_BLUE;
    case TickerCategory.GUARANTEED:
      return BadgeVariant.LIGHT_GREEN;
    case TickerCategory.BLOCKED_GUARANTEED:
      return BadgeVariant.DARK_GREEN;
    default:
      return BadgeVariant.DEFAULT;
  }
};
