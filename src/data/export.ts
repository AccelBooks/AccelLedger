import { Journal, Transaction } from './types';
import { formatTransaction } from './transaction';

export async function exportJournal(journal: Journal, filePath: string): Promise<void> {
  const content = formatJournal(journal);
  await writeFile(filePath, content);
}

function formatJournal(journal: Journal): string {
  const transactionStrings = journal.transactions.map(formatTransaction);
  return transactionStrings.join('\n\n');
}

async function writeFile(filePath: string, content: string): Promise<void> {
  // Implement file writing logic here
  // This is a placeholder implementation
}