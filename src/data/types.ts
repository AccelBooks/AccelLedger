import { Decimal } from 'decimal.js';

export type CommoditySymbol = string;
export type AccountName = string;

export interface AmountStyle {
  commoditySide: 'left' | 'right';
  commoditySpaced: boolean;
  decimalSeparator: string;
  thousandsSeparator: string | null;
  decimalDigits: number;
}

export interface Amount {
  quantity: Decimal;
  commodity: CommoditySymbol;
  style: AmountStyle;
}

export interface MixedAmount {
  amounts: Amount[];
}

export type PostingType = 'real' | 'virtual' | 'balanced-virtual';

export interface Posting {
  account: AccountName;
  amount: Amount | MixedAmount;
  type: PostingType;
  comment?: string;
  tags?: string[];
}

export interface Transaction {
  date: string;
  description: string;
  postings: Posting[];
  tags?: string[];
  comment?: string;
}