import { Date } from './date';
import { Posting } from './posting';

export interface Transaction {
  date: Date;
  description: string;
  postings: Posting[];
  tags?: string[];
  comment?: string;
}

export function createTransaction(
  date: Date,
  description: string,
  postings: Posting[],
  tags?: string[],
  comment?: string
): Transaction {
  return { date, description, postings, tags, comment };
}

export function addPosting(transaction: Transaction, posting: Posting): Transaction {
  return { ...transaction, postings: [...transaction.postings, posting] };
}

export function removePosting(transaction: Transaction, index: number): Transaction {
  const newPostings = [...transaction.postings];
  newPostings.splice(index, 1);
  return { ...transaction, postings: newPostings };
}

export function updatePosting(transaction: Transaction, index: number, updatedPosting: Posting): Transaction {
  const newPostings = [...transaction.postings];
  newPostings[index] = updatedPosting;
  return { ...transaction, postings: newPostings };
}

export function formatTransaction(transaction: Transaction): string {
  const { date, description, postings, tags, comment } = transaction;
  const tagsStr = tags ? tags.map(tag => `#${tag}`).join(' ') : '';
  const commentStr = comment ? `; ${comment}` : '';
  const header = `${date} ${description} ${tagsStr} ${commentStr}`.trim();
  const formattedPostings = postings.map(p => `  ${formatPosting(p)}`).join('\n');
  return `${header}\n${formattedPostings}`;
}

function formatPosting(posting: Posting): string {
  // This function should be imported from the posting module
  // Placeholder implementation:
  return `${posting.account}  ${posting.amount}`;
}