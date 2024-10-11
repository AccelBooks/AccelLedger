export type AccountName = string;

const VALID_ACCOUNT_NAME_REGEX = /^[A-Z][a-zA-Z0-9:]*$/;

export function parseAccountName(name: string): AccountName {
  if (!VALID_ACCOUNT_NAME_REGEX.test(name)) {
    throw new Error('Invalid account name format. Must start with a capital letter and contain only letters, numbers, and colons.');
  }
  return name;
}

export function formatAccountName(name: AccountName): string {
  return name;
}

export function isSubAccountOf(parent: AccountName, child: AccountName): boolean {
  return child.startsWith(parent + ':');
}

export function getParentAccount(name: AccountName): AccountName | null {
  const lastColonIndex = name.lastIndexOf(':');
  return lastColonIndex === -1 ? null : name.substring(0, lastColonIndex);
}

export function getAccountDepth(name: AccountName): number {
  return name.split(':').length;
}
