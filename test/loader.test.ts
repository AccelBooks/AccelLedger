const { loadString } = require("./loader.ts");

describe("Loader", () => {
  describe("loadString", () => {
    it("should load contents as a string", () => {
      const mockContent = `
; option "title" "Example Beancount file"
; option "operating_currency" "USD"

* Equity Accounts

; 1980-05-12 open Equity:Opening-Balances                         

; 1980-05-12 open Liabilities:AccountsPayable                     

* Banking

; 2012-01-01 open Assets:US:BofA:Checking                        USD

2012-01-01 * Opening Balance for checking account
  Assets:US:BofA:Checking                               3077.70 USD
  Equity:Opening-Balances                              -3077.70 USD

; 2012-01-02 balance Assets:US:BofA:Checking              3077.70 USD

2012-01-04 * BANK FEES | Monthly bank fee
  Assets:US:BofA:Checking                                 -4.00 USD
  Expenses:Financial:Fees                                  4.00 USD

2012-01-06 * RiverBank Properties | Paying the rent
  Assets:US:BofA:Checking                              -2400.00 USD
  Expenses:Home:Rent                                    2400.00 USD

2012-01-08 * EDISON POWER | 
  Assets:US:BofA:Checking                                -65.00 USD
  Expenses:Home:Electricity                               65.00 USD

;2012-01-21 balance Assets:US:BofA:Checking              3169.54 USD

2012-01-22 * Wine-Tarner Cable | 
  Assets:US:BofA:Checking                                -80.06 USD
  Expenses:Home:Internet                                  80.06 USD

2012-02-04 * BANK FEES | Monthly bank fee
  Assets:US:BofA:Checking                                 -4.00 USD
  Expenses:Financial:Fees                                  4.00 USD

2012-02-05 * RiverBank Properties | Paying the rent
  Assets:US:BofA:Checking                              -2400.00 USD
  Expenses:Home:Rent                                    2400.00 USD

2012-02-09 * EDISON POWER | 
  Assets:US:BofA:Checking                                -65.00 USD
  Expenses:Home:Electricity                               65.00 USD

;2012-02-13 balance Assets:US:BofA:Checking              1245.12 USD

2012-02-23 * Wine-Tarner Cable | 
  Assets:US:BofA:Checking                                -79.89 USD
  Expenses:Home:Internet                                  79.89 USD

2012-03-04 * BANK FEES | Monthly bank fee
  Assets:US:BofA:Checking                                 -4.00 USD
  Expenses:Financial:Fees                                  4.00 USD

2012-03-04 * RiverBank Properties | Paying the rent
  Assets:US:BofA:Checking                              -2400.00 USD
  Expenses:Home:Rent                                    2400.00 USD

2012-03-09 * EDISON POWER | 
  Assets:US:BofA:Checking                                -65.00 USD
  Expenses:Home:Electricity                               65.00 USD

;2012-03-10 balance Assets:US:BofA:Checking               817.43 USD

2012-03-21 * Wine-Tarner Cable | 
  Assets:US:BofA:Checking                                -80.12 USD
  Expenses:Home:Internet                                  80.12 USD

2012-04-03 * RiverBank Properties | Paying the rent
  Assets:US:BofA:Checking                              -2400.00 USD
  Expenses:Home:Rent                                    2400.00 USD

2012-04-04 * BANK FEES | Monthly bank fee
  Assets:US:BofA:Checking                                 -4.00 USD
  Expenses:Financial:Fees                                  4.00 USD

2012-04-08 * EDISON POWER | 
  Assets:US:BofA:Checking                                -65.00 USD
  Expenses:Home:Electricity                               65.00 USD

;2012-04-09 balance Assets:US:BofA:Checking               426.79 USD

2012-04-22 * Wine-Tarner Cable | 
  Assets:US:BofA:Checking                                -80.11 USD
  Expenses:Home:Internet                                  80.11 USD

2012-05-04 * BANK FEES | Monthly bank fee
  Assets:US:BofA:Checking                                 -4.00 USD
  Expenses:Financial:Fees                                  4.00 USD

2012-05-04 * RiverBank Properties | Paying the rent
  Assets:US:BofA:Checking                              -2400.00 USD
  Expenses:Home:Rent                                    2400.00 USD

;2012-05-07 balance Assets:US:BofA:Checking               643.88 USD

2012-05-08 * EDISON POWER | 
  Assets:US:BofA:Checking                                -65.00 USD
  Expenses:Home:Electricity                               65.00 USD

2012-05-23 * Wine-Tarner Cable | 
  Assets:US:BofA:Checking                                -80.06 USD
  Expenses:Home:Internet                                  80.06 USD

2012-06-04 * BANK FEES | Monthly bank fee
  Assets:US:BofA:Checking                                 -4.00 USD
  Expenses:Financial:Fees                                  4.00 USD

2012-06-05 * RiverBank Properties | Paying the rent
  Assets:US:BofA:Checking                              -2400.00 USD
  Expenses:Home:Rent                                    2400.00 USD

;2012-06-06 balance Assets:US:BofA:Checking               217.14 USD

2012-06-08 * EDISON POWER | 
  Assets:US:BofA:Checking                                -65.00 USD
  Expenses:Home:Electricity                               65.00 USD

2012-06-22 * Wine-Tarner Cable | 
  Assets:US:BofA:Checking                                -79.96 USD
  Expenses:Home:Internet                                  79.96 USD

;2012-07-03 balance Assets:US:BofA:Checking              2131.44 USD

2012-07-04 * BANK FEES | Monthly bank fee
  Assets:US:BofA:Checking                                 -4.00 USD
  Expenses:Financial:Fees                                  4.00 USD

2012-07-06 * RiverBank Properties | Paying the rent
  Assets:US:BofA:Checking                              -2400.00 USD
  Expenses:Home:Rent                                    2400.00 USD

2012-07-09 * EDISON POWER | 
  Assets:US:BofA:Checking                                -65.00 USD
  Expenses:Home:Electricity                               65.00 USD

2012-07-23 * Wine-Tarner Cable | 
  Assets:US:BofA:Checking                                -80.13 USD
  Expenses:Home:Internet                                  80.13 USD

;2012-08-01 balance Assets:US:BofA:Checking              2654.79 USD

2012-08-04 * BANK FEES | Monthly bank fee
  Assets:US:BofA:Checking                                 -4.00 USD
  Expenses:Financial:Fees                                  4.00 USD

2012-08-04 * RiverBank Properties | Paying the rent
  Assets:US:BofA:Checking                              -2400.00 USD
  Expenses:Home:Rent                                    2400.00 USD

2012-08-09 * EDISON POWER | 
  Assets:US:BofA:Checking                                -65.00 USD
  Expenses:Home:Electricity                               65.00 USD

2012-08-17 * Transfering accumulated savings to other account
  Assets:US:BofA:Checking                              -3500.00 USD
  Assets:US:ETrade:Cash                                 3500.00 USD

;2012-08-21 balance Assets:US:BofA:Checking              1173.27 USD

2012-08-22 * Wine-Tarner Cable | 
  Assets:US:BofA:Checking                                -80.00 USD
  Expenses:Home:Internet                                  80.00 USD

2012-09-04 * BANK FEES | Monthly bank fee
  Assets:US:BofA:Checking                                 -4.00 USD
  Expenses:Financial:Fees                                  4.00 USD

2012-09-05 * RiverBank Properties | Paying the rent
  Assets:US:BofA:Checking                              -2400.00 USD
  Expenses:Home:Rent                                    2400.00 USD

2012-09-09 * EDISON POWER | 
  Assets:US:BofA:Checking                                -65.00 USD
  Expenses:Home:Electricity                               65.00 USD

;2012-09-17 balance Assets:US:BofA:Checking              3199.84 USD

2012-09-22 * Wine-Tarner Cable | 
  Assets:US:BofA:Checking                                -80.19 USD
  Expenses:Home:Internet                                  80.19 USD

2012-10-03 * RiverBank Properties | Paying the rent
  Assets:US:BofA:Checking                              -2400.00 USD
  Expenses:Home:Rent                                    2400.00 USD

2012-10-04 * BANK FEES | Monthly bank fee
  Assets:US:BofA:Checking                                 -4.00 USD
  Expenses:Financial:Fees                                  4.00 USD

2012-10-08 * EDISON POWER | 
  Assets:US:BofA:Checking                                -65.00 USD
  Expenses:Home:Electricity                               65.00 USD

2012-10-12 * Transfering accumulated savings to other account
  Assets:US:BofA:Checking                              -4500.00 USD
  Assets:US:ETrade:Cash                                 4500.00 USD

;2012-10-15 balance Assets:US:BofA:Checking               628.18 USD

2012-10-22 * Wine-Tarner Cable | 
  Assets:US:BofA:Checking                                -79.93 USD
  Expenses:Home:Internet                                  79.93 USD

2012-11-04 * BANK FEES | Monthly bank fee
  Assets:US:BofA:Checking                                 -4.00 USD
  Expenses:Financial:Fees                                  4.00 USD

2012-11-05 * RiverBank Properties | Paying the rent
  Assets:US:BofA:Checking                              -2400.00 USD
  Expenses:Home:Rent                                    2400.00 USD

2012-11-09 * EDISON POWER | 
  Assets:US:BofA:Checking                                -65.00 USD
  Expenses:Home:Electricity                               65.00 USD

;2012-11-10 balance Assets:US:BofA:Checking              2604.67 USD

2012-11-22 * Wine-Tarner Cable | 
  Assets:US:BofA:Checking                                -79.86 USD
  Expenses:Home:Internet                                  79.86 USD

2012-12-03 * RiverBank Properties | Paying the rent
  Assets:US:BofA:Checking                              -2400.00 USD
  Expenses:Home:Rent                                    2400.00 USD

;2012-12-04 balance Assets:US:BofA:Checking              2675.41 USD

2012-12-04 * BANK FEES | Monthly bank fee
  Assets:US:BofA:Checking                                 -4.00 USD
  Expenses:Financial:Fees                                  4.00 USD

2012-12-09 * EDISON POWER | 
  Assets:US:BofA:Checking                                -65.00 USD
  Expenses:Home:Electricity                               65.00 USD

2012-12-23 * Wine-Tarner Cable | 
  Assets:US:BofA:Checking                                -80.17 USD
  Expenses:Home:Internet                                  80.17 USD

;2012-12-24 balance Assets:US:BofA:Checking              7448.62 USD

2013-01-04 * BANK FEES | Monthly bank fee
  Assets:US:BofA:Checking                                 -4.00 USD
  Expenses:Financial:Fees                                  4.00 USD

2013-01-04 * RiverBank Properties | Paying the rent
  Assets:US:BofA:Checking                              -2400.00 USD
  Expenses:Home:Rent                                    2400.00 USD

2013-01-08 * EDISON POWER | 
  Assets:US:BofA:Checking                                -65.00 USD
  Expenses:Home:Electricity                               65.00 USD

;2013-01-20 balance Assets:US:BofA:Checking              6871.27 USD

2013-01-21 * Wine-Tarner Cable | 
  Assets:US:BofA:Checking                                -79.98 USD
  Expenses:Home:Internet                                  79.98 USD

2013-02-04 * BANK FEES | Monthly bank fee
  Assets:US:BofA:Checking                                 -4.00 USD
  Expenses:Financial:Fees                                  4.00 USD

2013-02-06 * RiverBank Properties | Paying the rent
  Assets:US:BofA:Checking                              -2400.00 USD
  Expenses:Home:Rent                                    2400.00 USD

2013-02-09 * EDISON POWER | 
  Assets:US:BofA:Checking                                -65.00 USD
  Expenses:Home:Electricity                               65.00 USD

;2013-02-11 balance Assets:US:BofA:Checking              5218.92 USD

2013-02-22 * Wine-Tarner Cable | 
  Assets:US:BofA:Checking                                -80.02 USD
  Expenses:Home:Internet                                  80.02 USD

2013-03-04 * BANK FEES | Monthly bank fee
  Assets:US:BofA:Checking                                 -4.00 USD
  Expenses:Financial:Fees                                  4.00 USD

2013-03-05 * RiverBank Properties | Paying the rent
  Assets:US:BofA:Checking                              -2400.00 USD
  Expenses:Home:Rent                                    2400.00 USD

2013-03-08 * EDISON POWER | 
  Assets:US:BofA:Checking                                -65.00 USD
  Expenses:Home:Electricity                               65.00 USD

;2013-03-10 balance Assets:US:BofA:Checking              4713.79 USD

2013-03-21 * Wine-Tarner Cable | 
  Assets:US:BofA:Checking                                -79.97 USD
  Expenses:Home:Internet                                  79.97 USD

;2013-04-02 balance Assets:US:BofA:Checking              6417.59 USD

2013-04-04 * BANK FEES | Monthly bank fee
  Assets:US:BofA:Checking                                 -4.00 USD
  Expenses:Financial:Fees                                  4.00 USD

2013-04-04 * RiverBank Properties | Paying the rent
  Assets:US:BofA:Checking                              -2400.00 USD
  Expenses:Home:Rent                                    2400.00 USD

2013-04-09 * EDISON POWER | 
  Assets:US:BofA:Checking                                -65.00 USD
  Expenses:Home:Electricity                               65.00 USD

;2013-04-23 balance Assets:US:BofA:Checking              4543.93 USD

2013-04-23 * Wine-Tarner Cable | 
  Assets:US:BofA:Checking                                -79.83 USD
  Expenses:Home:Internet                                  79.83 USD

2013-05-04 * BANK FEES | Monthly bank fee
  Assets:US:BofA:Checking                                 -4.00 USD
  Expenses:Financial:Fees                                  4.00 USD

2013-05-06 * RiverBank Properties | Paying the rent
  Assets:US:BofA:Checking                              -2400.00 USD
  Expenses:Home:Rent                                    2400.00 USD

2013-05-09 * EDISON POWER | 
  Assets:US:BofA:Checking                                -65.00 USD
  Expenses:Home:Electricity                               65.00 USD

;2013-05-16 balance Assets:US:BofA:Checking              4033.82 USD

2013-05-23 * Wine-Tarner Cable | 
  Assets:US:BofA:Checking                                -79.90 USD
  Expenses:Home:Internet                                  79.90 USD

2013-06-04 * BANK FEES | Monthly bank fee
  Assets:US:BofA:Checking                                 -4.00 USD
  Expenses:Financial:Fees                                  4.00 USD

2013-06-04 * RiverBank Properties | Paying the rent
  Assets:US:BofA:Checking                              -2400.00 USD
  Expenses:Home:Rent                                    2400.00 USD

2013-06-07 * Transfering accumulated savings to other account
  Assets:US:BofA:Checking                              -3000.00 USD
  Assets:US:ETrade:Cash                                 3000.00 USD

2013-06-08 * EDISON POWER | 
  Assets:US:BofA:Checking                                -65.00 USD
  Expenses:Home:Electricity                               65.00 USD

;2013-06-12 balance Assets:US:BofA:Checking               661.67 USD

2013-06-22 * Wine-Tarner Cable | 
  Assets:US:BofA:Checking                                -80.10 USD
  Expenses:Home:Internet                                  80.10 USD

;2013-07-02 balance Assets:US:BofA:Checking              1932.17 USD

2013-07-04 * BANK FEES | Monthly bank fee
  Assets:US:BofA:Checking                                 -4.00 USD
  Expenses:Financial:Fees                                  4.00 USD

2013-07-05 * RiverBank Properties | Paying the rent
  Assets:US:BofA:Checking                              -2400.00 USD
  Expenses:Home:Rent                                    2400.00 USD

2013-07-09 * EDISON POWER | 
  Assets:US:BofA:Checking                                -65.00 USD
  Expenses:Home:Electricity                               65.00 USD

2013-07-21 * Wine-Tarner Cable | 
  Assets:US:BofA:Checking                                -79.87 USD
  Expenses:Home:Internet                                  79.87 USD

;2013-07-27 balance Assets:US:BofA:Checking              2025.90 USD

2013-08-04 * BANK FEES | Monthly bank fee
  Assets:US:BofA:Checking                                 -4.00 USD
  Expenses:Financial:Fees                                  4.00 USD

2013-08-04 * RiverBank Properties | Paying the rent
  Assets:US:BofA:Checking                              -2400.00 USD
  Expenses:Home:Rent                                    2400.00 USD

2013-08-08 * EDISON POWER | 
  Assets:US:BofA:Checking                                -65.00 USD
  Expenses:Home:Electricity                               65.00 USD

2013-08-16 * Transfering accumulated savings to other account
  Assets:US:BofA:Checking                              -3000.00 USD
  Assets:US:ETrade:Cash                                 3000.00 USD

;2013-08-22 balance Assets:US:BofA:Checking              1305.12 USD

2013-08-22 * Wine-Tarner Cable | 
  Assets:US:BofA:Checking                                -80.01 USD
  Expenses:Home:Internet                                  80.01 USD

2013-09-04 * BANK FEES | Monthly bank fee
  Assets:US:BofA:Checking                                 -4.00 USD
  Expenses:Financial:Fees                                  4.00 USD

2013-09-06 * RiverBank Properties | Paying the rent
  Assets:US:BofA:Checking                              -2400.00 USD
  Expenses:Home:Rent                                    2400.00 USD

2013-09-09 * EDISON POWER | 
  Assets:US:BofA:Checking                                -65.00 USD
  Expenses:Home:Electricity                               65.00 USD

;2013-09-12 balance Assets:US:BofA:Checking               552.76 USD

2013-09-23 * Wine-Tarner Cable | 
  Assets:US:BofA:Checking                                -79.95 USD
  Expenses:Home:Internet                                  79.95 USD

2013-10-04 * BANK FEES | Monthly bank fee
  Assets:US:BofA:Checking                                 -4.00 USD
  Expenses:Financial:Fees                                  4.00 USD

2013-10-04 * RiverBank Properties | Paying the rent
  Assets:US:BofA:Checking                              -2400.00 USD
  Expenses:Home:Rent                                    2400.00 USD

2013-10-08 * EDISON POWER | 
  Assets:US:BofA:Checking                                -65.00 USD
  Expenses:Home:Electricity                               65.00 USD

2013-10-11 * Transfering accumulated savings to other account
  Assets:US:BofA:Checking                              -4500.00 USD
  Assets:US:ETrade:Cash                                 4500.00 USD

;2013-10-12 balance Assets:US:BofA:Checking               670.65 USD

2013-10-23 * Wine-Tarner Cable | 
  Assets:US:BofA:Checking                                -79.99 USD
  Expenses:Home:Internet                                  79.99 USD

2013-11-04 * BANK FEES | Monthly bank fee
  Assets:US:BofA:Checking                                 -4.00 USD
  Expenses:Financial:Fees                                  4.00 USD

2013-11-05 * RiverBank Properties | Paying the rent
  Assets:US:BofA:Checking                              -2400.00 USD
  Expenses:Home:Rent                                    2400.00 USD

;2013-11-07 balance Assets:US:BofA:Checking               737.26 USD

2013-11-08 * EDISON POWER | 
  Assets:US:BofA:Checking                                -65.00 USD
  Expenses:Home:Electricity                               65.00 USD

2013-11-22 * Wine-Tarner Cable | 
  Assets:US:BofA:Checking                                -80.18 USD
  Expenses:Home:Internet                                  80.18 USD

;2013-11-29 balance Assets:US:BofA:Checking              4910.34 USD

2013-12-04 * BANK FEES | Monthly bank fee
  Assets:US:BofA:Checking                                 -4.00 USD
  Expenses:Financial:Fees                                  4.00 USD

2013-12-05 * RiverBank Properties | Paying the rent
  Assets:US:BofA:Checking                              -2400.00 USD
  Expenses:Home:Rent                                    2400.00 USD

2013-12-09 * EDISON POWER | 
  Assets:US:BofA:Checking                                -65.00 USD
  Expenses:Home:Electricity                               65.00 USD

2013-12-23 * Wine-Tarner Cable | 
  Assets:US:BofA:Checking                                -80.02 USD
  Expenses:Home:Internet                                  80.02 USD

;2013-12-25 balance Assets:US:BofA:Checking              7247.12 USD

2014-01-04 * BANK FEES | Monthly bank fee
  Assets:US:BofA:Checking                                 -4.00 USD
  Expenses:Financial:Fees                                  4.00 USD

2014-01-06 * RiverBank Properties | Paying the rent
  Assets:US:BofA:Checking                              -2400.00 USD
  Expenses:Home:Rent                                    2400.00 USD

2014-01-08 * EDISON POWER | 
  Assets:US:BofA:Checking                                -65.00 USD
  Expenses:Home:Electricity                               65.00 USD

2014-01-22 * Wine-Tarner Cable | 
  Assets:US:BofA:Checking                                -80.14 USD
  Expenses:Home:Internet                                  80.14 USD

;2014-01-23 balance Assets:US:BofA:Checking              6883.74 USD

2014-02-04 * BANK FEES | Monthly bank fee
  Assets:US:BofA:Checking                                 -4.00 USD
  Expenses:Financial:Fees                                  4.00 USD

2014-02-04 * RiverBank Properties | Paying the rent
  Assets:US:BofA:Checking                              -2400.00 USD
  Expenses:Home:Rent                                    2400.00 USD

2014-02-09 * EDISON POWER | 
  Assets:US:BofA:Checking                                -65.00 USD
  Expenses:Home:Electricity                               65.00 USD

;2014-02-20 balance Assets:US:BofA:Checking              6214.80 USD

2014-02-22 * Wine-Tarner Cable | 
  Assets:US:BofA:Checking                                -79.92 USD
  Expenses:Home:Internet                                  79.92 USD

2014-03-03 * RiverBank Properties | Paying the rent
  Assets:US:BofA:Checking                              -2400.00 USD
  Expenses:Home:Rent                                    2400.00 USD

2014-03-04 * BANK FEES | Monthly bank fee
  Assets:US:BofA:Checking                                 -4.00 USD
  Expenses:Financial:Fees                                  4.00 USD

2014-03-09 * EDISON POWER | 
  Assets:US:BofA:Checking                                -65.00 USD
  Expenses:Home:Electricity                               65.00 USD

;2014-03-18 balance Assets:US:BofA:Checking              5697.94 USD

2014-03-21 * Wine-Tarner Cable | 
  Assets:US:BofA:Checking                                -80.14 USD
  Expenses:Home:Internet                                  80.14 USD

2014-04-04 * BANK FEES | Monthly bank fee
  Assets:US:BofA:Checking                                 -4.00 USD
  Expenses:Financial:Fees                                  4.00 USD

2014-04-04 * RiverBank Properties | Paying the rent
  Assets:US:BofA:Checking                              -2400.00 USD
  Expenses:Home:Rent                                    2400.00 USD

2014-04-09 * EDISON POWER | 
  Assets:US:BofA:Checking                                -65.00 USD
  Expenses:Home:Electricity                               65.00 USD

;2014-04-11 balance Assets:US:BofA:Checking              4393.37 USD

2014-04-23 * Wine-Tarner Cable | 
  Assets:US:BofA:Checking                                -80.07 USD
  Expenses:Home:Internet                                  80.07 USD

;2014-05-03 balance Assets:US:BofA:Checking              5663.90 USD

2014-05-03 * RiverBank Properties | Paying the rent
  Assets:US:BofA:Checking                              -2400.00 USD
  Expenses:Home:Rent                                    2400.00 USD

2014-05-04 * BANK FEES | Monthly bank fee
  Assets:US:BofA:Checking                                 -4.00 USD
  Expenses:Financial:Fees                                  4.00 USD

2014-05-08 * EDISON POWER | 
  Assets:US:BofA:Checking                                -65.00 USD
  Expenses:Home:Electricity                               65.00 USD

2014-05-21 * Wine-Tarner Cable | 
  Assets:US:BofA:Checking                                -80.03 USD
  Expenses:Home:Internet                                  80.03 USD

;2014-05-29 balance Assets:US:BofA:Checking              5217.75 USD

2014-06-03 * RiverBank Properties | Paying the rent
  Assets:US:BofA:Checking                              -2400.00 USD
  Expenses:Home:Rent                                    2400.00 USD

2014-06-04 * BANK FEES | Monthly bank fee
  Assets:US:BofA:Checking                                 -4.00 USD
  Expenses:Financial:Fees                                  4.00 USD

2014-06-09 * EDISON POWER | 
  Assets:US:BofA:Checking                                -65.00 USD
  Expenses:Home:Electricity                               65.00 USD

2014-06-21 * Wine-Tarner Cable | 
  Assets:US:BofA:Checking                                -79.97 USD
  Expenses:Home:Internet                                  79.97 USD

;2014-06-26 balance Assets:US:BofA:Checking              4576.97 USD

2014-07-03 * RiverBank Properties | Paying the rent
  Assets:US:BofA:Checking                              -2400.00 USD
  Expenses:Home:Rent                                    2400.00 USD

2014-07-04 * BANK FEES | Monthly bank fee
  Assets:US:BofA:Checking                                 -4.00 USD
  Expenses:Financial:Fees                                  4.00 USD

2014-07-09 * EDISON POWER | 
  Assets:US:BofA:Checking                                -65.00 USD
  Expenses:Home:Electricity                               65.00 USD

2014-07-18 * Transfering accumulated savings to other account
  Assets:US:BofA:Checking                              -4000.00 USD
  Assets:US:ETrade:Cash                                 4000.00 USD

;2014-07-20 balance Assets:US:BofA:Checking              1034.54 USD

2014-07-21 * Wine-Tarner Cable | 
  Assets:US:BofA:Checking                                -80.12 USD
  Expenses:Home:Internet                                  80.12 USD

2014-08-03 * RiverBank Properties | Paying the rent
  Assets:US:BofA:Checking                              -2400.00 USD
  Expenses:Home:Rent                                    2400.00 USD

2014-08-04 * BANK FEES | Monthly bank fee
  Assets:US:BofA:Checking                                 -4.00 USD
  Expenses:Financial:Fees                                  4.00 USD

2014-08-08 * EDISON POWER | 
  Assets:US:BofA:Checking                                -65.00 USD
  Expenses:Home:Electricity                               65.00 USD

;2014-08-19 balance Assets:US:BofA:Checking              3025.80 USD

2014-08-22 * Wine-Tarner Cable | 
  Assets:US:BofA:Checking                                -80.01 USD
  Expenses:Home:Internet                                  80.01 USD

2014-09-03 * RiverBank Properties | Paying the rent
  Assets:US:BofA:Checking                              -2400.00 USD
  Expenses:Home:Rent                                    2400.00 USD

2014-09-04 * BANK FEES | Monthly bank fee
  Assets:US:BofA:Checking                                 -4.00 USD
  Expenses:Financial:Fees                                  4.00 USD

2014-09-08 * EDISON POWER | 
  Assets:US:BofA:Checking                                -65.00 USD
  Expenses:Home:Electricity                               65.00 USD

2014-09-12 * Transfering accumulated savings to other account
  Assets:US:BofA:Checking                              -4000.00 USD
  Assets:US:ETrade:Cash                                 4000.00 USD

;2014-09-16 balance Assets:US:BofA:Checking               578.95 USD

2014-09-23 * Wine-Tarner Cable | 
  Assets:US:BofA:Checking                                -80.10 USD
  Expenses:Home:Internet                                  80.10 USD

2014-10-04 * BANK FEES | Monthly bank fee
  Assets:US:BofA:Checking                                 -4.00 USD
  Expenses:Financial:Fees                                  4.00 USD

;2014-10-07 balance Assets:US:BofA:Checking              3045.45 USD

2014-10-10 * Transfering accumulated savings to other account
  Assets:US:BofA:Checking                              -5000.00 USD
  Assets:US:ETrade:Cash                                 5000.00 USD

* Credit-Cards

; 1980-05-12 open Liabilities:US:Chase:Slate                      USD

2012-01-04 * Goba Goba | Eating out with Julie
  Liabilities:US:Chase:Slate                             -22.32 USD
  Expenses:Food:Restaurant                                22.32 USD

2012-01-05 * Rose Flower | Eating out with work buddies
  Liabilities:US:Chase:Slate                             -15.99 USD
  Expenses:Food:Restaurant                                15.99 USD

2012-01-06 * Farmer Fresh | Buying groceries
  Liabilities:US:Chase:Slate                             -77.89 USD
  Expenses:Food:Groceries                                 77.89 USD

2012-01-08 * Cafe Modagor | Eating out 
  Liabilities:US:Chase:Slate                             -24.16 USD
  Expenses:Food:Restaurant                                24.16 USD

2012-01-08 * Chase:Slate | Paying off credit card
  Liabilities:US:Chase:Slate                             140.36 USD
  Assets:US:BofA:Checking                               -140.36 USD

2012-01-11 * Kin Soy | Eating out after work
  Liabilities:US:Chase:Slate                             -36.44 USD
  Expenses:Food:Restaurant                                36.44 USD

2012-01-14 * China Garden | Eating out with Bill
  Liabilities:US:Chase:Slate                             -29.22 USD
  Expenses:Food:Restaurant                                29.22 USD

2012-01-19 * Goba Goba | Eating out with Julie
  Liabilities:US:Chase:Slate                             -32.07 USD
  Expenses:Food:Restaurant                                32.07 USD

2012-01-19 * Onion Market | Buying groceries
  Liabilities:US:Chase:Slate                            -111.33 USD
  Expenses:Food:Groceries                                111.33 USD

;2012-01-21 balance Liabilities:US:Chase:Slate           -209.06 USD

2012-01-22 * Uncle Boons | Eating out after work
  Liabilities:US:Chase:Slate                             -30.23 USD
  Expenses:Food:Restaurant                                30.23 USD

2012-01-26 * Rose Flower | Eating out alone
  Liabilities:US:Chase:Slate                             -67.88 USD
  Expenses:Food:Restaurant                                67.88 USD

2012-01-27 * Jewel of Morroco | Eating out with Bill
  Liabilities:US:Chase:Slate                             -35.28 USD
  Expenses:Food:Restaurant                                35.28 USD

2012-01-27 * Corner Deli | Buying groceries
  Liabilities:US:Chase:Slate                             -59.92 USD
  Expenses:Food:Groceries                                 59.92 USD

2012-01-29 * Metro Transport Authority | Tram tickets
  Liabilities:US:Chase:Slate                            -120.00 USD
  Expenses:Transport:Tram                                120.00 USD

2012-02-01 * Kin Soy | Eating out 
  Liabilities:US:Chase:Slate                             -25.84 USD
  Expenses:Food:Restaurant                                25.84 USD

2012-02-03 * Onion Market | Buying groceries
  Liabilities:US:Chase:Slate                             -50.16 USD
  Expenses:Food:Groceries                                 50.16 USD

2012-02-04 * Jewel of Morroco | Eating out with Joe
  Liabilities:US:Chase:Slate                             -36.73 USD
  Expenses:Food:Restaurant                                36.73 USD

2012-02-08 * Cafe Modagor | Eating out with Bill
  Liabilities:US:Chase:Slate                             -28.11 USD
  Expenses:Food:Restaurant                                28.11 USD

2012-02-09 * Chichipotle | Eating out alone
  Liabilities:US:Chase:Slate                             -21.12 USD
  Expenses:Food:Restaurant                                21.12 USD

2012-02-11 * Chichipotle | Eating out after work
  Liabilities:US:Chase:Slate                             -41.63 USD
  Expenses:Food:Restaurant                                41.63 USD

2012-02-11 * Chase:Slate | Paying off credit card
  Liabilities:US:Chase:Slate                             725.96 USD
  Assets:US:BofA:Checking                               -725.96 USD

2012-02-15 * Corner Deli | Buying groceries
  Liabilities:US:Chase:Slate                             -66.76 USD
  Expenses:Food:Groceries                                 66.76 USD

2012-02-16 * Cafe Modagor | Eating out 
  Liabilities:US:Chase:Slate                             -18.89 USD
  Expenses:Food:Restaurant                                18.89 USD

2012-02-18 * Chichipotle | Eating out with Joe
  Liabilities:US:Chase:Slate                             -12.94 USD
  Expenses:Food:Restaurant                                12.94 USD

;2012-02-20 balance Liabilities:US:Chase:Slate            -98.59 USD

2012-02-20 * Uncle Boons | Eating out with Bill
  Liabilities:US:Chase:Slate                             -16.37 USD
  Expenses:Food:Restaurant                                16.37 USD

2012-02-24 * Kin Soy | Eating out alone
  Liabilities:US:Chase:Slate                             -39.36 USD
  Expenses:Food:Restaurant                                39.36 USD

2012-02-25 * Farmer Fresh | Buying groceries
  Liabilities:US:Chase:Slate                             -68.11 USD
  Expenses:Food:Groceries                                 68.11 USD

2012-02-27 * Rose Flower | Eating out with Joe
  Liabilities:US:Chase:Slate                             -32.95 USD
  Expenses:Food:Restaurant                                32.95 USD

2012-02-28 * Metro Transport Authority | Tram tickets
  Liabilities:US:Chase:Slate                            -120.00 USD
  Expenses:Transport:Tram                                120.00 USD

2012-03-01 * Chichipotle | Eating out with Natasha
  Liabilities:US:Chase:Slate                             -15.73 USD
  Expenses:Food:Restaurant                                15.73 USD

2012-03-01 * Farmer Fresh | Buying groceries
  Liabilities:US:Chase:Slate                             -49.81 USD
  Expenses:Food:Groceries                                 49.81 USD

2012-03-04 * Cafe Modagor | Eating out with Joe
  Liabilities:US:Chase:Slate                             -13.61 USD
  Expenses:Food:Restaurant                                13.61 USD

2012-03-05 * Cafe Modagor | Eating out with Julie
  Liabilities:US:Chase:Slate                             -40.20 USD
  Expenses:Food:Restaurant                                40.20 USD

2012-03-07 * Kin Soy | Eating out with Natasha
  Liabilities:US:Chase:Slate                             -25.19 USD
  Expenses:Food:Restaurant                                25.19 USD

2012-03-09 * Chase:Slate | Paying off credit card
  Liabilities:US:Chase:Slate                             580.00 USD
  Assets:US:BofA:Checking                               -580.00 USD

2012-03-11 * Uncle Boons | Eating out 
  Liabilities:US:Chase:Slate                             -60.08 USD
  Expenses:Food:Restaurant                                60.08 USD

2012-03-14 * Cafe Modagor | Eating out alone
  Liabilities:US:Chase:Slate                             -31.70 USD
  Expenses:Food:Restaurant                                31.70 USD

2012-03-17 * Farmer Fresh | Buying groceries
  Liabilities:US:Chase:Slate                             -54.08 USD
  Expenses:Food:Groceries                                 54.08 USD

2012-03-18 * China Garden | Eating out 
  Liabilities:US:Chase:Slate                             -32.29 USD
  Expenses:Food:Restaurant                                32.29 USD

;2012-03-20 balance Liabilities:US:Chase:Slate           -118.07 USD

2012-03-22 * China Garden | Eating out 
  Liabilities:US:Chase:Slate                             -20.44 USD
  Expenses:Food:Restaurant                                20.44 USD

2012-03-23 * Rose Flower | Eating out with Julie
  Liabilities:US:Chase:Slate                             -28.67 USD
  Expenses:Food:Restaurant                                28.67 USD

2012-03-24 * Cafe Modagor | Eating out with Natasha
  Liabilities:US:Chase:Slate                             -25.43 USD
  Expenses:Food:Restaurant                                25.43 USD

2012-03-28 * Goba Goba | Eating out with work buddies
  Liabilities:US:Chase:Slate                             -71.20 USD
  Expenses:Food:Restaurant                                71.20 USD

2012-03-28 * Metro Transport Authority | Tram tickets
  Liabilities:US:Chase:Slate                            -120.00 USD
  Expenses:Transport:Tram                                120.00 USD

2012-03-29 * Farmer Fresh | Buying groceries
  Liabilities:US:Chase:Slate                             -65.48 USD
  Expenses:Food:Groceries                                 65.48 USD

2012-03-30 * Jewel of Morroco | Eating out with Bill
  Liabilities:US:Chase:Slate                             -18.03 USD
  Expenses:Food:Restaurant                                18.03 USD

2012-04-02 * Goba Goba | Eating out 
  Liabilities:US:Chase:Slate                             -17.66 USD
  Expenses:Food:Restaurant                                17.66 USD

2012-04-04 * Chichipotle | Eating out after work
  Liabilities:US:Chase:Slate                             -30.58 USD
  Expenses:Food:Restaurant                                30.58 USD

2012-04-07 * Chase:Slate | Paying off credit card
  Liabilities:US:Chase:Slate                             542.72 USD
  Assets:US:BofA:Checking                               -542.72 USD

2012-04-08 * Kin Soy | Eating out 
  Liabilities:US:Chase:Slate                             -27.16 USD
  Expenses:Food:Restaurant                                27.16 USD

2012-04-10 * Rose Flower | Eating out with Julie
  Liabilities:US:Chase:Slate                             -31.96 USD
  Expenses:Food:Restaurant                                31.96 USD

2012-04-11 * Goba Goba | Eating out with Julie
  Liabilities:US:Chase:Slate                             -45.00 USD
  Expenses:Food:Restaurant                                45.00 USD

2012-04-11 * Good Moods Market | Buying groceries
  Liabilities:US:Chase:Slate                             -58.59 USD
  Expenses:Food:Groceries                                 58.59 USD

;2012-04-12 balance Liabilities:US:Chase:Slate           -135.55 USD

2012-04-16 * Uncle Boons | Eating out after work
  Liabilities:US:Chase:Slate                             -25.71 USD
  Expenses:Food:Restaurant                                25.71 USD

2012-04-20 * Jewel of Morroco | Eating out 
  Liabilities:US:Chase:Slate                             -27.73 USD
  Expenses:Food:Restaurant                                27.73 USD

2012-04-24 * Uncle Boons | Eating out with Joe
  Liabilities:US:Chase:Slate                             -21.67 USD
  Expenses:Food:Restaurant                                21.67 USD

2012-04-24 * Metro Transport Authority | Tram tickets
  Liabilities:US:Chase:Slate                            -120.00 USD
  Expenses:Transport:Tram                                120.00 USD

2012-04-25 * Rose Flower | Eating out with Bill
  Liabilities:US:Chase:Slate                             -18.59 USD
  Expenses:Food:Restaurant                                18.59 USD

2012-04-26 * Jewel of Morroco | Eating out with Julie
  Liabilities:US:Chase:Slate                             -56.00 USD
  Expenses:Food:Restaurant                                56.00 USD

2012-04-30 * Cafe Modagor | Eating out after work
  Liabilities:US:Chase:Slate                             -17.39 USD
  Expenses:Food:Restaurant                                17.39 USD

2012-04-30 * Corner Deli | Buying groceries
  Liabilities:US:Chase:Slate                             -75.74 USD
  Expenses:Food:Groceries                                 75.74 USD

2012-05-03 * Rose Flower | Eating out with Joe
  Liabilities:US:Chase:Slate                             -37.93 USD
  Expenses:Food:Restaurant                                37.93 USD

2012-05-05 * China Garden | Eating out with Julie
  Liabilities:US:Chase:Slate                             -26.73 USD
  Expenses:Food:Restaurant                                26.73 USD

2012-05-07 * Uncle Boons | Eating out alone
  Liabilities:US:Chase:Slate                             -15.84 USD
  Expenses:Food:Restaurant                                15.84 USD

2012-05-07 * Chase:Slate | Paying off credit card
  Liabilities:US:Chase:Slate                             578.88 USD
  Assets:US:BofA:Checking                               -578.88 USD

;2012-05-10 balance Liabilities:US:Chase:Slate              0.00 USD

2012-05-10 * Rose Flower | Eating out with work buddies
  Liabilities:US:Chase:Slate                             -27.22 USD
  Expenses:Food:Restaurant                                27.22 USD

2012-05-12 * Good Moods Market | Buying groceries
  Liabilities:US:Chase:Slate                            -141.26 USD
  Expenses:Food:Groceries                                141.26 USD

2012-05-15 * Rose Flower | Eating out alone
  Liabilities:US:Chase:Slate                             -17.28 USD
  Expenses:Food:Restaurant                                17.28 USD

2012-05-19 * Kin Soy | Eating out with Natasha
  Liabilities:US:Chase:Slate                             -29.08 USD
  Expenses:Food:Restaurant                                29.08 USD

2012-05-21 * Cafe Modagor | Eating out alone
  Liabilities:US:Chase:Slate                             -14.31 USD
  Expenses:Food:Restaurant                                14.31 USD

2012-05-23 * Metro Transport Authority | Tram tickets
  Liabilities:US:Chase:Slate                            -120.00 USD
  Expenses:Transport:Tram                                120.00 USD

2012-05-26 * Goba Goba | Eating out with Julie
  Liabilities:US:Chase:Slate                             -84.76 USD
  Expenses:Food:Restaurant                                84.76 USD

2012-05-29 * Farmer Fresh | Buying groceries
  Liabilities:US:Chase:Slate                             -81.95 USD
  Expenses:Food:Groceries                                 81.95 USD

2012-05-30 * Cafe Modagor | Eating out with work buddies
  Liabilities:US:Chase:Slate                             -23.66 USD
  Expenses:Food:Restaurant                                23.66 USD

;2012-05-31 balance Liabilities:US:Chase:Slate           -539.52 USD

2012-06-04 * Chichipotle | Eating out 
  Liabilities:US:Chase:Slate                             -31.09 USD
  Expenses:Food:Restaurant                                31.09 USD

2012-06-09 * Cafe Modagor | Eating out with Natasha
  Liabilities:US:Chase:Slate                             -34.11 USD
  Expenses:Food:Restaurant                                34.11 USD

2012-06-11 * Rose Flower | Eating out alone
  Liabilities:US:Chase:Slate                             -37.22 USD
  Expenses:Food:Restaurant                                37.22 USD

2012-06-11 * Chase:Slate | Paying off credit card
  Liabilities:US:Chase:Slate                             641.94 USD
  Assets:US:BofA:Checking                               -641.94 USD

2012-06-12 * China Garden | Eating out with Julie
  Liabilities:US:Chase:Slate                             -14.29 USD
  Expenses:Food:Restaurant                                14.29 USD

2012-06-17 * Cafe Modagor | Eating out with work buddies
  Liabilities:US:Chase:Slate                             -34.63 USD
  Expenses:Food:Restaurant                                34.63 USD

2012-06-17 * Onion Market | Buying groceries
  Liabilities:US:Chase:Slate                             -74.28 USD
  Expenses:Food:Groceries                                 74.28 USD

2012-06-19 * Metro Transport Authority | Tram tickets
  Liabilities:US:Chase:Slate                            -120.00 USD
  Expenses:Transport:Tram                                120.00 USD

2012-06-20 * Goba Goba | Eating out with Bill
  Liabilities:US:Chase:Slate                             -18.22 USD
  Expenses:Food:Restaurant                                18.22 USD

2012-06-21 * Rose Flower | Eating out with Bill
  Liabilities:US:Chase:Slate                             -31.70 USD
  Expenses:Food:Restaurant                                31.70 USD

;2012-06-23 balance Liabilities:US:Chase:Slate           -293.12 USD

2012-06-25 * Goba Goba | Eating out with Julie
  Liabilities:US:Chase:Slate                             -22.42 USD
  Expenses:Food:Restaurant                                22.42 USD

2012-06-29 * Kin Soy | Eating out with Bill
  Liabilities:US:Chase:Slate                             -35.17 USD
  Expenses:Food:Restaurant                                35.17 USD

2012-07-01 * Goba Goba | Eating out 
  Liabilities:US:Chase:Slate                             -39.68 USD
  Expenses:Food:Restaurant                                39.68 USD

2012-07-02 * China Garden | Eating out 
  Liabilities:US:Chase:Slate                             -32.59 USD
  Expenses:Food:Restaurant                                32.59 USD

2012-07-06 * Chichipotle | Eating out after work
  Liabilities:US:Chase:Slate                             -31.42 USD
  Expenses:Food:Restaurant                                31.42 USD

2012-07-07 * China Garden | Eating out with work buddies
  Liabilities:US:Chase:Slate                             -19.65 USD
  Expenses:Food:Restaurant                                19.65 USD

2012-07-07 * Farmer Fresh | Buying groceries
  Liabilities:US:Chase:Slate                            -110.36 USD
  Expenses:Food:Groceries                                110.36 USD

2012-07-10 * Chase:Slate | Paying off credit card
  Liabilities:US:Chase:Slate                             628.72 USD
  Assets:US:BofA:Checking;`;
      try {
        const result = loadString(mockContent);
        console.log("loadString result:", result);
        expect(result).toBeDefined();
      } catch (error) {
        console.error("loadString error:", error);
        throw error;
      }
    });
  });
});
