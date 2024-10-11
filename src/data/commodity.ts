import type { AmountStyle } from './amount';

export type CommoditySymbol = string;

export interface Commodity {
  symbol: CommoditySymbol;
  fullName?: string;
  format: AmountStyle;
  note?: string;
}

export function createCommodity(
  symbol: CommoditySymbol,
  fullName?: string,
  format?: Partial<AmountStyle>,
  note?: string
): Commodity {
  return {
    symbol,
    fullName,
    format: {
      commoditySide: 'left',
      commoditySpaced: true,
      decimalSeparator: '.',
      thousandsSeparator: ',',
      decimalDigits: 2,
      ...format
    },
    note
  };
}

export function formatCommodityAmount(commodity: Commodity, quantity: number): string {
  const { format } = commodity;
  const formattedQuantity = quantity.toFixed(format.decimalDigits)
    .replace('.', format.decimalSeparator)
    .replace(/\B(?=(\d{3})+(?!\d))/g, format.thousandsSeparator || '');

  if (format.commoditySide === 'left') {
    return `${commodity.symbol}${format.commoditySpaced ? ' ' : ''}${formattedQuantity}`;
  } else {
    return `${formattedQuantity}${format.commoditySpaced ? ' ' : ''}${commodity.symbol}`;
  }
}

export function parseCommodityAmount(commodity: Commodity, amountString: string): number {
  const { format } = commodity;
  const cleanedString = amountString.replace(commodity.symbol, '').trim();
  const numberString = cleanedString
    .replace(format.decimalSeparator, '.')
    .replace(new RegExp(format.thousandsSeparator || '', 'g'), '');
  return parseFloat(numberString);
}