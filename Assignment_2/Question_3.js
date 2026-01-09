const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function findTax(salary) {
  let taxAmount;

  switch (true) {
    case (salary > 0 && salary <= 500000):
      taxAmount = 0;
      break;
    case (salary > 500000 && salary <= 1000000):
      taxAmount = salary * 0.10;
      break;
    case (salary > 1000000 && salary <= 1500000):
      taxAmount = salary * 0.20;
      break;
    case (salary > 1500000):
      taxAmount = salary * 0.30;
      break;
    default:
      return "Invalid salary input";
  }
  return taxAmount;
}

rl.question('Enter the salary: ', (input) => {
  const salary = parseFloat(input);
  const result = findTax(salary);
  
  console.log(`Tax Amount: ${result}`);
  
  rl.close();
});