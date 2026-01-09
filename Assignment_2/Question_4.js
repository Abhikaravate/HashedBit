const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function sumOfProductOfDigits(n1, n2) {
  const str1 = n1.toString().split('').reverse();
  const str2 = n2.toString().split('').reverse();
  
  const maxLength = Math.max(str1.length, str2.length);
  let sum = 0;

  for (let i = 0; i < maxLength; i++) {
    const digit1 = parseInt(str1[i] || 0);
    const digit2 = parseInt(str2[i] || 0);
    
    sum += (digit1 * digit2);
  }
  
  return sum;
}

rl.question('Enter the first number (n1): ', (input1) => {
  rl.question('Enter the second number (n2): ', (input2) => {
    
    const n1 = parseInt(input1);
    const n2 = parseInt(input2);

    const result = sumOfProductOfDigits(n1, n2);
    console.log(`Sum of products: ${result}`);

    rl.close();
  });
});