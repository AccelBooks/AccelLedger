export interface SimpleDate {
  year: number;
  month: number;
  day: number;
}

/**
 * Type for an [hledger amount](https://hledger.org/1.26/hledger.html#amounts) including
 * the value and commodity name.
 */
export interface Amount {
  value: string;
  number: string;
  commodity?: string;
  sign?: "-" | "+";
}
export type StatusIndicator = "cleared" | "pending" | "unmarked";
export interface Posting {
  account: Account;
  amount?: Amount;
  lotPrice?: LotPrice;
  assertion?: Assertion;
  status: StatusIndicator;
}
export interface Tag {
  name: string;
  value?: string;
}

export interface Assertion {
  amount: Amount;
  type: "strong" | "normal";
  subaccounts: boolean;
}

export interface LotPrice {
  amount: Amount;
  lotPriceType: "total" | "unit";
}

export interface Transaction {
  date: SimpleDate;
  postingDate?: SimpleDate;
  status: string;
  chequeNumber?: string;
  description: string;
  postings: Posting[];
  tags: Tag[];
}

class Account {
  name: string;
  fullName: string[];
  parent: Account | null = null;
  balance: { [commodity: string]: Amount } = {};

  constructor(name: string, fullName: string[]) {
    this.name = name;
    this.fullName = fullName;
  }

  setParent(parent: Account) {
    this.parent = parent;
  }
}

class AccelLedger {
  private transactions: Transaction[];
  private accounts: { [key: string]: Account } = {};

  constructor(transactions: Transaction[]) {
    this.transactions = transactions;
    this.processTransactions();
  }

  private processTransactions() {
    for (const transaction of this.transactions) {
      if (transaction.postings.length >= 2) {
        const [firstPosting, secondPosting] = transaction.postings;

        if (firstPosting.amount && !secondPosting.amount) {
          // Create an opposite amount for the second posting
          secondPosting.amount = {
            ...firstPosting.amount,
            sign: firstPosting.amount.sign === "-" ? "+" : "-",
            value: firstPosting.amount.number,
          };
        }
      }

      for (const posting of transaction.postings) {
        this.ensureAccount(posting.account.fullName);
        if (posting.amount) {
          this.updateAccountBalance(posting.account.fullName, posting.amount);
        }
      }
    }
  }

  private updateAccountBalance(accountPath: string[], amount: Amount) {
    let currentPath: string[] = [];
    for (const segment of accountPath) {
      currentPath.push(segment);
      const fullName = currentPath.join(":");
      const account = this.accounts[fullName];
      if (account) {
        const commodity = amount.commodity || "DEFAULT";
        if (!account.balance[commodity]) {
          account.balance[commodity] = { ...amount, value: "0" };
        }

        // Convert string values to numbers before arithmetic operations
        const currentValue = parseFloat(account.balance[commodity].number) || 0;
        const amountValue = parseFloat(amount.number) || 0;
        console.log(
          `Current value: ${currentValue}, Amount value: ${amountValue}, Current sign: ${account.balance[commodity].sign}, Amount sign: ${amount.sign}`
        );

        // Calculate new value considering both signs
        const newValue =
          (account.balance[commodity].sign === "-"
            ? -currentValue
            : currentValue) +
          (amount.sign === "-" ? -amountValue : amountValue);

        account.balance[commodity] = {
          ...account.balance[commodity],
          value: Math.abs(newValue).toFixed(2), // Use toFixed(2) for 2 decimal places
          sign: newValue < 0 ? "-" : "+",
        };

        console.log(
          `Updated balance for ${fullName} - ${commodity}: ${
            account.balance[commodity].sign || ""
          }${account.balance[commodity].number}`
        );
      }
    }
  }

  private ensureAccount(accountPath: string[]) {
    let currentAccount: Account | null = null;

    for (let i = 0; i < accountPath.length; i++) {
      const fullPath = accountPath.slice(0, i + 1);
      const fullName = fullPath.join(":");

      if (!this.accounts[fullName]) {
        const newAccount = new Account(accountPath[i], fullPath);
        this.accounts[fullName] = newAccount;

        if (currentAccount) {
          newAccount.setParent(currentAccount);
        }
      }

      currentAccount = this.accounts[fullName];
    }
  }

  getLedgerByMonth(year: string, month: string): Transaction[] {
    return this.transactions.filter(
      (t) =>
        t.date.year.toString() === year && t.date.month.toString() === month
    );
  }

  getLedgerByYear(year: string): Transaction[] {
    return this.transactions.filter((t) => t.date.year.toString() === year);
  }

  getBalances(): { [accountName: string]: { [commodity: string]: number } } {
    const balances: { [accountName: string]: { [commodity: string]: number } } =
      {};

    // Helper function to recursively aggregate balances
    const aggregateBalances = (
      account: Account
    ): { [commodity: string]: number } => {
      const aggregatedBalance: { [commodity: string]: number } = {};

      // Add the account's own balance
      for (const [commodity, amount] of Object.entries(account.balance)) {
        aggregatedBalance[commodity] =
          parseFloat(amount.number) * (amount.sign === "-" ? -1 : 1);
      }

      // Recursively aggregate balances from children
      for (const childAccount of Object.values(this.accounts)) {
        if (childAccount.parent === account) {
          const childBalance = aggregateBalances(childAccount);
          for (const [commodity, amount] of Object.entries(childBalance)) {
            aggregatedBalance[commodity] =
              (aggregatedBalance[commodity] || 0) + amount;
          }
        }
      }

      // Store the aggregated balance for this account
      balances[account.fullName.join(":")] = aggregatedBalance;

      return aggregatedBalance;
    };

    // Start aggregation from root accounts
    for (const account of Object.values(this.accounts)) {
      if (!account.parent) {
        aggregateBalances(account);
      }
    }

    return balances;
  }

  getAccountHierarchy(): { [key: string]: any } {
    const rootAccounts: { [key: string]: any } = {};

    for (const account of Object.values(this.accounts)) {
      if (!account.parent) {
        rootAccounts[account.name] = this.buildHierarchy(account);
      }
    }

    return rootAccounts;
  }

  private buildHierarchy(account: Account): any {
    const result: any = {
      name: account.name,
      fullName: account.fullName,
      balance: account.balance,
      children: {},
    };

    for (const childAccount of Object.values(this.accounts)) {
      if (childAccount.parent === account) {
        result.children[childAccount.name] = this.buildHierarchy(childAccount);
      }
    }

    return result;
  }
}

export { AccelLedger };
