import { Date } from './date';
import { CommoditySymbol } from './commodity';
import { Decimal } from 'decimal.js';

export interface Price {
  date: Date;
  commodity: CommoditySymbol;
  referenceCommodity: CommoditySymbol;
  rate: Decimal;
}

export function createPrice(
  date: Date,
  commodity: CommoditySymbol,
  referenceCommodity: CommoditySymbol,
  rate: Decimal | number | string
): Price {
  return {
    date,
    commodity,
    referenceCommodity,
    rate: new Decimal(rate)
  };
}

export function applyPrice(price: Price, amount: Decimal): Decimal {
  return amount.times(price.rate);
}

export function invertPrice(price: Price): Price {
  return {
    ...price,
    commodity: price.referenceCommodity,
    referenceCommodity: price.commodity,
    rate: new Decimal(1).dividedBy(price.rate)
  };
}

export function formatPrice(price: Price): string {
  return `P ${price.date} ${price.commodity} ${price.rate} ${price.referenceCommodity}`;
}

export function parsePrice(priceString: string): Price {
  const parts = priceString.split(' ');
  if (parts.length !== 5 || parts[0] !== 'P') {
    throw new Error('Invalid price format');
  }
  return createPrice(parts[1], parts[2], parts[4], parts[3]);
}