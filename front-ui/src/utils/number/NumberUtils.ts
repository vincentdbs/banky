const priceRegex: RegExp = /\B(?=(\d{3})+(?!\d))/g;

export const FIRST_YEAR: 2021 = 2021;

/**
 * Formats a number as a decimal price with the specified number of decimal places
 * @param price - The price to format
 * @param numberOfDecimals - Number of decimal places to display (default: 2)
 * @returns The formatted price string
 */
export const formatDecimalPrice = (price: number, numberOfDecimals: number = 2): string => {
  if (numberOfDecimals < 0) {
    throw new Error('Number of decimals cannot be negative');
  }

  const splitedNumber: string[] = price.toFixed(numberOfDecimals).split('.');
  let integerPart: string = splitedNumber[0];
  const decimalPart: string | undefined = splitedNumber[1];

  integerPart = integerPart.replace(priceRegex, ' ');
  return decimalPart !== undefined ? `${integerPart},${decimalPart}` : integerPart;
};

/**
 * Formats a number as a Euro price with the specified number of decimal places
 * @param price - The price to format
 * @param numberOfDecimals - Number of decimal places to display (default: 2)
 * @returns The formatted price string with Euro symbol
 */
export const formatEuroDecimalPrice = (price: number, numberOfDecimals: number = 2): string => (
  `${formatDecimalPrice(price, numberOfDecimals)} €`
);

/**
 * Formats a string price value into a Euro price display format.
 * Used for API responses where the value is a string without fractional part.
 * Example: "1123320" will be formatted as "1 123,32 €"
 *
 * @param priceString - The price string without fractional part (e.g. "1123320" for 1123.32)
 * @param numberOfDecimals - Number of decimal places to display (default: 2)
 * @returns The formatted price string with Euro symbol
 */
export const formatEuroDecimalPriceFromString = (priceString: string, numberOfDecimals: number = 2): string => {
  if (!priceString) {
    return '0,00 €';
  }

  // Parse string to number, dividing by 10^numberOfDecimals
  const divisor: number = 10 ** numberOfDecimals;
  const numericValue: number = parseInt(priceString, 10) / divisor;

  return formatEuroDecimalPrice(numericValue, numberOfDecimals);
};

/**
 * Formats a string percentage value into a percentage display format.
 * Used for API responses where the value is a string without fractional part.
 * Example: "1234" will be formatted as "12,34 %"
 *
 * @param percentageString - The percentage string without fractional part (e.g. "1234" for 12.34%)
 * @param numberOfDecimals - Number of decimal places to display (default: 2)
 * @returns The formatted percentage string with percentage symbol
 */
export const formatPercentageDecimalPriceFromString = (percentageString: string, numberOfDecimals: number = 2): string => {
  if (!percentageString) {
    return '0,00 %';
  }

  // Parse string to number, dividing by 10^numberOfDecimals
  const divisor: number = 10 ** numberOfDecimals;
  const numericValue: number = parseInt(percentageString, 10) / divisor;

  return `${formatDecimalPrice(numericValue, numberOfDecimals)} %`;
};

export const threeDecimalNumberToString = (number: number): string => `${number * 1000}`;

export const twoDecimalNumberToString = (number: number): string => `${number * 100}`;

export const computeColorClass = (value: string | number): string => {
  const parsedValue: number = typeof value === 'string' ? parseInt(value, 10) : value;

  if (parsedValue < 0) {
    return 'text-red-600';
  } if (parsedValue > 0) {
    return 'text-green-600';
  }

  return '';
};
