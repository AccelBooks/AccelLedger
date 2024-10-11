import { AccountName } from './account_name';
import { Amount } from './amount';
import type { MixedAmount } from './amount';

export type PostingType = 'real' | 'virtual' | 'balanced-virtual';

export interface Posting {
  account: AccountName;
  amount: Amount | MixedAmount;
  type: PostingType;
  comment?: string;
  tags?: string[];
}

export function createPosting(
  account: AccountName,
  amount: Amount | MixedAmount,
  type: PostingType = 'real',
  comment?: string,
  tags?: string[]
): Posting {
  return { account, amount, type, comment, tags };
}

export function isBalanced(posting: Posting): boolean {
  if ('amounts' in posting.amount) {
    return posting.amount.amounts.every(amt => amt.quantity.isZero());
  }
  return posting.amount.quantity.isZero();
}

export function negatePosting(posting: Posting): Posting {
  if ('amounts' in posting.amount) {
    return {
      ...posting,
      amount: {
        amounts: posting.amount.amounts.map(amt => ({ ...amt, quantity: amt.quantity.negated() }))
      }
    };
  }
  return {
    ...posting,
    amount: { ...posting.amount, quantity: posting.amount.quantity.negated() }
  };
}

export function formatPosting(posting: Posting): string {
  const typePrefix = posting.type === 'virtual' ? '(' : posting.type === 'balanced-virtual' ? '[' : '';
  const typeSuffix = posting.type === 'virtual' ? ')' : posting.type === 'balanced-virtual' ? ']' : '';
  const amountStr = 'amounts' in posting.amount
    ? posting.amount.amounts.map(amt => `${amt.quantity} ${amt.commodity}`).join(', ')
    : `${posting.amount.quantity} ${posting.amount.commodity}`;
  const tagsStr = posting.tags ? posting.tags.map(tag => `#${tag}`).join(' ') : '';
  const commentStr = posting.comment ? `; ${posting.comment}` : '';

  return `${typePrefix}${posting.account}${typeSuffix}  ${amountStr}  ${tagsStr}  ${commentStr}`.trim();
}