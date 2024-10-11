import { Loader } from './loader.ts';


class AccelLedger {
  constructor() {
    this.loader = new Loader();
    this.accounts = [];
    this.balances = {};
    this.transactions = [];
  }

  async initialize() {
    const data = await this.loader.loadData();
    this.processData(data);
  }

  processData(data) {
    // Process accounts
    this.accounts = data.accounts.map(account => ({
      id: account.id,
      name: account.name,
      type: account.type
    }));

    // Process balances
    this.balances = data.balances.reduce((acc, balance) => {
      acc[balance.account_id] = balance.amount;
      return acc;
    }, {});

    // Process transactions
    this.transactions = data.transactions.map(transaction => ({
      id: transaction.id,
      date: new Date(transaction.date),
      description: transaction.description,
      amount: transaction.amount,
      fromAccount: transaction.from_account_id,
      toAccount: transaction.to_account_id
    }));
  }

  generateBalanceSheet(date = new Date()) {
    return generateBalanceSheet(this.accounts, this.balances, date);
  }

  generateIncomeStatement(startDate, endDate) {
    return generateIncomeStatement(this.accounts, this.transactions, startDate, endDate);
  }

  // Add more report methods as needed
}

// Usage example
const accelLedger = new AccelLedger();
await accelLedger.initialize();

const balanceSheet = accelLedger.generateBalanceSheet();
console.log(balanceSheet);

const incomeStatement = accelLedger.generateIncomeStatement(new Date('2023-01-01'), new Date('2023-12-31'));
console.log(incomeStatement);
