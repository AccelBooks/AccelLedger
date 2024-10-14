export interface SimpleDate {
    year: number;
    month: number;
    day: number;
}
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
declare class Account {
    name: string;
    fullName: string[];
    parent: Account | null;
    balance: {
        [commodity: string]: Amount;
    };
    constructor(name: string, fullName: string[]);
    setParent(parent: Account): void;
}
declare class AccelLedger {
    private transactions;
    private accounts;
    constructor(transactions: Transaction[]);
    private processTransactions;
    private updateAccountBalance;
    private ensureAccount;
    getLedgerByMonth(year: string, month: string): Transaction[];
    getLedgerByYear(year: string): Transaction[];
    getBalances(): {
        [accountName: string]: {
            [commodity: string]: number;
        };
    };
    getAccountHierarchy(): {
        [key: string]: any;
    };
    private buildHierarchy;
}
export { AccelLedger };
