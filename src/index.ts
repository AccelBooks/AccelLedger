import {loadString}  from './loader.ts';

function main() {
  const data = loadString(
    `
    2021-01-01 * "Test Transaction"
      Expenses:Food  $10
      Assets:Cash
    `
  );

  console.log(data);
}

// Run the main function
main();
