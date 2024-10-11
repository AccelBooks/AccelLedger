import { Decimal } from "decimal.js";
import type { CommoditySymbol } from "./commodity";

export type Amount = {
  quantity: Decimal;
  commodity: CommoditySymbol;
  style: AmountStyle;
};

export type AmountStyle = {
  commoditySide: "left" | "right";
  commoditySpaced: boolean;
  decimalSeparator: string;
  thousandsSeparator: string | null;
  decimalDigits: number;
};

export type MixedAmount = {
  amounts: Amount[];
};

export function createAmount(
  quantity: number | string,
  commodity: string,
  style?: Partial<AmountStyle>
): Amount {
  return {
    quantity: new Decimal(quantity),
    commodity,
    style: {
      commoditySide: "left",
      commoditySpaced: true,
      decimalSeparator: ".",
      thousandsSeparator: ",",
      decimalDigits: 2,
      ...style,
    },
  };
}

export function createMixedAmount(amounts: Amount[]): MixedAmount {
  return { amounts };
}

export function formatAmount(amount: Amount): string {
  const { quantity, commodity, style } = amount;
  const formattedQuantity = formatQuantity(quantity, style);

  if (style.commoditySide === "left") {
    return `${commodity}${
      style.commoditySpaced ? " " : ""
    }${formattedQuantity}`;
  } else {
    return `${formattedQuantity}${
      style.commoditySpaced ? " " : ""
    }${commodity}`;
  }
}

export function formatMixedAmount(mixedAmount: MixedAmount): string {
  return mixedAmount.amounts.map(formatAmount).join(", ");
}

export function parseAmount(amountString: string): Amount {
  // Implement parsing logic here
  // This is a placeholder implementation
  const [quantity, commodity] = amountString.trim().split(" ");
  return createAmount(quantity, commodity);
}

export function addAmounts(a: Amount, b: Amount): Amount | null {
  if (a.commodity !== b.commodity) {
    return null;
  }
  return createAmount(a.quantity.plus(b.quantity), a.commodity, a.style);
}

export function sumMixedAmounts(a: MixedAmount, b: MixedAmount): MixedAmount {
  const result: { [key: string]: Amount } = {};

  [...a.amounts, ...b.amounts].forEach((amount) => {
    if (result[amount.commodity]) {
      result[amount.commodity] = addAmounts(result[amount.commodity], amount)!;
    } else {
      result[amount.commodity] = amount;
    }
  });

  return createMixedAmount(Object.values(result));
}

function formatQuantity(quantity: Decimal, style: AmountStyle): string {
  return quantity
    .toFixed(style.decimalDigits)
    .replace(".", style.decimalSeparator)
    .replace(/\B(?=(\d{3})+(?!\d))/g, style.thousandsSeparator || "");
}
