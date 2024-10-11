import type { AccountName } from './account_name';
import type { Amount, MixedAmount } from './amount';
import type { Commodity } from './commodity';

import { Transaction } from './transaction';
import { Account } from './acccount';
import { Price } from './price';

export interface Journal {
  transactions: Transaction[];
  accounts: Account[];
  prices: Price[];
  commodities: Commodity[];
}

export function createJournal(
  transactions: Transaction[] = [],
  accounts: Account[] = [],
  prices: Price[] = [],
  commodities: Commodity[] = []
): Journal {
  return { transactions, accounts, prices, commodities };
}

export function addTransaction(journal: Journal, transaction: Transaction): Journal {
  return { ...journal, transactions: [...journal.transactions, transaction] };
}

export function addAccount(journal: Journal, account: Account): Journal {
  return { ...journal, accounts: [...journal.accounts, account] };
}

export function addPrice(journal: Journal, price: Price): Journal {
  return { ...journal, prices: [...journal.prices, price] };
}

export function addCommodity(journal: Journal, commodity: Commodity): Journal {
  return { ...journal, commodities: [...journal.commodities, commodity] };
}

export function getAccountByName(journal: Journal, accountName: string): Account | undefined {
  return journal.accounts.find(account => account.name === accountName);
}

export function getCommodityBySymbol(journal: Journal, symbol: string): Commodity | undefined {
  return journal.commodities.find(commodity => commodity.symbol === symbol);
}

export function getLatestPrice(journal: Journal, commodity: string, referenceCommodity: string): Price | undefined {
  return journal.prices
    .filter(price => price.commodity === commodity && price.referenceCommodity === referenceCommodity)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
}

export function formatJournal(journal: Journal): string {
  const commoditiesStr = journal.commodities.map(formatCommodity).join('\n');
  const accountsStr = journal.accounts.map(formatAccount).join('\n');
  const pricesStr = journal.prices.map(formatPrice).join('\n');
  const transactionsStr = journal.transactions.map(formatTransaction).join('\n\n');

  return `${commoditiesStr}\n\n${accountsStr}\n\n${pricesStr}\n\n${transactionsStr}`;
}

function formatCommodity(commodity: Commodity): string {
  // This function should be imported from the commodity module
  // Placeholder implementation:
  return `commodity ${commodity.symbol}`;
}

function formatAccount(account: Account): string {
  // This function should be imported from the account module
  // Placeholder implementation:
  return `account ${account.name}`;
}

function formatPrice(price: Price): string {
  // This function should be imported from the price module
  // Placeholder implementation:
  return `P ${price.date} ${price.commodity} ${price.rate} ${price.referenceCommodity}`;
}

function formatTransaction(transaction: Transaction): string {
  // This function should be imported from the transaction module
  // Placeholder implementation:
  return `${transaction.date} ${transaction.description}`;
}