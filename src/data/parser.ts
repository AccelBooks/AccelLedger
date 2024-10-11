import { Transaction, Posting, Amount, MixedAmount } from './types';
import { parseDate } from './date';
import { parseAccountName } from './account_name';
import { createAmount } from './amount';

export function parseTransaction(transactionString: string): Transaction {
  const lines = transactionString.trim().split('\n');
  const [dateStr, description, ...rest] = lines[0].split(' ');
  const date = parseDate(dateStr);

  const postings: Posting[] = [];
  for (let i = 1; i < lines.length; i++) {
    const posting = parsePosting(lines[i]);
    if (posting) postings.push(posting);
  }

  return {
    date,
    description: description + ' ' + rest.join(' '),
    postings
  };
}

function parsePosting(postingString: string): Posting | null {
  const match = postingString.trim().match(/^(\S+)\s+(.+)$/);
  if (!match) return null;

  const [, accountStr, amountStr] = match;
  const account = parseAccountName(accountStr);
  const amount = parseAmount(amountStr);

  return {
    account,
    amount,
    type: 'real' // Assuming all postings are real for simplicity
  };
}

function parseAmount(amountString: string): Amount | MixedAmount {
  const amounts = amountString.split(',').map(s => s.trim());
  if (amounts.length === 1) {
    const [quantity, commodity] = amounts[0].split(' ');
    return createAmount(quantity, commodity);
  } else {
    return {
      amounts: amounts.map(a => {
        const [quantity, commodity] = a.split(' ');
        return createAmount(quantity, commodity);
      })
    };
  }
}