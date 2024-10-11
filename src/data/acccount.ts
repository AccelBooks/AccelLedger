import { AccountName, parseAccountName } from "./account_name";
import {
  Amount,
  MixedAmount,
  createMixedAmount,
  sumMixedAmounts,
} from "./amount";

export interface Account {
  name: AccountName;
  balance: MixedAmount;
  notes?: string;
  tags?: string[];
}

export function createAccount(
  name: string,
  initialBalance: Amount[] = [],
  notes?: string,
  tags?: string[]
): Account {
  return {
    name: parseAccountName(name),
    balance: createMixedAmount(initialBalance),
    notes,
    tags,
  };
}

export function addToBalance(account: Account, amount: Amount): Account {
  const newBalance = sumMixedAmounts(
    account.balance,
    createMixedAmount([amount])
  );
  return { ...account, balance: newBalance };
}

export function transferBetweenAccounts(
  fromAccount: Account,
  toAccount: Account,
  amount: Amount
): [Account, Account] {
  const updatedFromAccount = addToBalance(fromAccount, {
    ...amount,
    quantity: amount.quantity.negated(),
  });
  const updatedToAccount = addToBalance(toAccount, amount);
  return [updatedFromAccount, updatedToAccount];
}

export function getAccountBalance(account: Account): MixedAmount {
  return account.balance;
}

export function addAccountTag(account: Account, tag: string): Account {
  const updatedTags = [...(account.tags || []), tag];
  return { ...account, tags: updatedTags };
}

export function removeAccountTag(account: Account, tag: string): Account {
  const updatedTags = (account.tags || []).filter((t) => t !== tag);
  return { ...account, tags: updatedTags };
}

export function updateAccountNotes(account: Account, notes: string): Account {
  return { ...account, notes };
}
