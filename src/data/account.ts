import type { AccountName } from './account_name';
import { Amount, MixedAmount, sumMixedAmounts, createMixedAmount } from './amount';

// Define and export Account-related types and functions
export interface Account {
  name: AccountName;
  balance: MixedAmount;
  notes?: string;
}

export function createAccount(name: AccountName, initialBalance: MixedAmount = createMixedAmount([]), notes?: string): Account {
  return {
    name,
    balance: initialBalance,
    notes
  };
}

export function updateAccountBalance(account: Account, amount: Amount): Account {
  const newBalance = sumMixedAmounts(account.balance, createMixedAmount([amount]));
  return { ...account, balance: newBalance };
}

export function getAccountBalance(account: Account): MixedAmount {
  return account.balance;
}

export function addNoteToAccount(account: Account, note: string): Account {
  const updatedNotes = account.notes ? `${account.notes}\n${note}` : note;
  return { ...account, notes: updatedNotes };
}