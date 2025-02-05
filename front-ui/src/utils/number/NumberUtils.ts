const priceRegex: RegExp = /\B(?=(\d{3})+(?!\d))/g;

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

export const formatEuroDecimalPrice = (price: number, numberOfDecimals: number = 2): string => {
  return `${formatDecimalPrice(price, numberOfDecimals)} €`;
};