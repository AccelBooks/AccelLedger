import { Transaction, Account, MixedAmount } from './types';
import { mixedAmountPlus, nullMixedAmount } from './utils';
import { getAccountBalance, addToBalance } from './acccount';

export function calculateBalance(transactions: Transaction[]): Map<string, MixedAmount> {
  const balances = new Map<string, MixedAmount>();

  for (const transaction of transactions) {
    for (const posting of transaction.postings) {
      const currentBalance = balances.get(posting.account) || nullMixedAmount();
      const newBalance = mixedAmountPlus(currentBalance, posting.amount);
      balances.set(posting.account, newBalance);
    }
  }

  return balances;
}

export function updateAccountBalances(accounts: Account[], transactions: Transaction[]): Account[] {
  const balances = calculateBalance(transactions);
  
  return accounts.map(account => {
    const newBalance = balances.get(account.name) || nullMixedAmount();
    return { ...account, balance: newBalance };
  });
}

export function getAccountBalanceAtDate(account: Account, transactions: Transaction[], date: string): MixedAmount {
  let balance = getAccountBalance(account);

  for (const transaction of transactions) {
    if (transaction.date > date) break;

    for (const posting of transaction.postings) {
      if (posting.account === account.name) {
        balance = mixedAmountPlus(balance, posting.amount);
      }
    }
  }

  return balance;
}