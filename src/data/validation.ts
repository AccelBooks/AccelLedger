import { Transaction, Posting, Account, Journal } from './types';
import { isTransactionBalanced } from './balancing';
import { getAccountByName } from './journal';

export function validateTransaction(transaction: Transaction, journal: Journal): string[] {
  const errors: string[] = [];

  // Check if the transaction is balanced
  if (!isTransactionBalanced({ ignoreAssertions: false, inferBalancingCosts: false }, transaction)) {
    errors.push('Transaction is not balanced');
  }

  // Check if all accounts in the transaction exist in the journal
  for (const posting of transaction.postings) {
    if (!getAccountByName(journal, posting.account)) {
      errors.push(`Account "${posting.account}" does not exist in the journal`);
    }
  }

  // Add more validation rules as needed

  return errors;
}

export function validatePosting(posting: Posting, journal: Journal): string[] {
  const errors: string[] = [];

  // Check if the account exists
  if (!getAccountByName(journal, posting.account)) {
    errors.push(`Account "${posting.account}" does not exist in the journal`);
  }

  // Add more validation rules as needed

  return errors;
}

export function validateAccount(account: Account): string[] {
  const errors: string[] = [];

  // Add validation rules for accounts

  return errors;
}

export function validateJournal(journal: Journal): string[] {
  const errors: string[] = [];

  // Validate all transactions
  journal.transactions.forEach((transaction, index) => {
    const transactionErrors = validateTransaction(transaction, journal);
    if (transactionErrors.length > 0) {
      errors.push(`Transaction ${index + 1} has errors: ${transactionErrors.join(', ')}`);
    }
  });

  // Validate all accounts
  journal.accounts.forEach((account) => {
    const accountErrors = validateAccount(account);
    if (accountErrors.length > 0) {
      errors.push(`Account "${account.name}" has errors: ${accountErrors.join(', ')}`);
    }
  });

  // Add more journal-level validation rules as needed

  return errors;
}