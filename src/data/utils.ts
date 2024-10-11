import { Decimal } from 'decimal.js';
import { Amount, MixedAmount } from './types';

export function nullMixedAmount(): MixedAmount {
  return { amounts: [] };
}

export function mixedAmountPlus(a: MixedAmount, b: MixedAmount): MixedAmount {
  const result: { [key: string]: Amount } = {};

  [...a.amounts, ...b.amounts].forEach(amount => {
    if (result[amount.commodity]) {
      result[amount.commodity] = {
        ...result[amount.commodity],
        quantity: result[amount.commodity].quantity.plus(amount.quantity)
      };
    } else {
      result[amount.commodity] = amount;
    }
  });

  return { amounts: Object.values(result) };
}

export function mixedAmountMinus(a: MixedAmount, b: MixedAmount): MixedAmount {
  return mixedAmountPlus(a, negateMixedAmount(b));
}

export function negateMixedAmount(a: MixedAmount): MixedAmount {
  return {
    amounts: a.amounts.map(amount => ({
      ...amount,
      quantity: amount.quantity.negated()
    }))
  };
}

export function mixedAmountLooksZero(a: MixedAmount): boolean {
  return a.amounts.every(amount => amount.quantity.isZero());
}

export function formatMixedAmount(amount: MixedAmount): string {
  return amount.amounts.map(formatAmount).join(', ');
}

function formatAmount(amount: Amount): string {
  const { quantity, commodity, style } = amount;
  const formattedQuantity = formatQuantity(quantity, style);
  
  if (style.commoditySide === 'left') {
    return `${commodity}${style.commoditySpaced ? ' ' : ''}${formattedQuantity}`;
  } else {
    return `${formattedQuantity}${style.commoditySpaced ? ' ' : ''}${commodity}`;
  }
}

function formatQuantity(quantity: Decimal, style: AmountStyle): string {
  return quantity.toFixed(style.decimalDigits)
    .replace('.', style.decimalSeparator)
    .replace(/\B(?=(\d{3})+(?!\d))/g, style.thousandsSeparator || '');
}