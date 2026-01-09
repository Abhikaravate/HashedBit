const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function calculate(num1, num2, operator) {
  let result;
  switch (operator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      if (num2 !== 0) {
        result = num1 / num2;
      } else {
        return "Cannot divide by zero";
      }
      break;
    default:
      return "Invalid operator";
  }
  return result;
}

rl.question('Enter the first number: ', (input1) => {
  rl.question('Enter the second number: ', (input2) => {
    rl.question('Enter the operator (+, -, *, /): ', (operator) => {
      
      const num1 = parseFloat(input1);
      const num2 = parseFloat(input2);

      const result = calculate(num1, num2, operator);
      console.log(`Result: ${result}`);

      rl.close();
    });
  });
});