import { Amount, MixedAmount, addAmounts, createMixedAmount, sumMixedAmounts } from './amount';
import { AccountName } from './account_name';

// Define and export balancing-related functions
export function balanceTransaction(postings: Array<{ account: AccountName, amount: Amount }>): Amount | null {
  let balance: MixedAmount = createMixedAmount([]);
  
  for (const posting of postings) {
    balance = sumMixedAmounts(balance, createMixedAmount([posting.amount]));
  }

  if (balance.amounts.length === 0) {
    return null;
  }

  if (balance.amounts.length > 1) {
    throw new Error("Transaction is unbalanced across multiple commodities");
  }

  return {
    ...balance.amounts[0],
    quantity: balance.amounts[0].quantity.negated()
  };
}

export function validateBalancedTransaction(postings: Array<{ account: AccountName, amount: Amount }>): boolean {
  const balance = balanceTransaction(postings);
  return balance === null || balance.quantity.isZero();
}