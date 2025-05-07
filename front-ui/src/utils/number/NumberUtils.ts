const priceRegex: RegExp = /\B(?=(\d{3})+(?!\d))/g;

export const FIRST_YEAR: 2021 = 2021;

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
  const divisor: number = Math.pow(10, numberOfDecimals);
  const numericValue: number = parseInt(priceString, 10) / divisor;
  
  return formatEuroDecimalPrice(numericValue, numberOfDecimals);
};
