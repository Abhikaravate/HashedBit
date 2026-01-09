const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.question('Enter a string (min 20 chars): ', (str) => {
  if (str.length < 20) {
    console.log("String is too short.");
  } else {
    let vowels = 0;
    let consonants = 0;
    const lowerStr = str.toLowerCase();

    for (let char of lowerStr) {
      if (char >= 'a' && char <= 'z') {
        if (['a', 'e', 'i', 'o', 'u'].includes(char)) {
          vowels++;
        } else {
          consonants++;
        }
      }
    }
    console.log(`Vowels: ${vowels}, Consonants: ${consonants}`);
  }
  rl.close();
});

//  My name is abhi i am from kolhapur 