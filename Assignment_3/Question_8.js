function repeatedSum(num) {
  while (num > 9) {
    let sum = 0;
    while (num > 0) {
      sum += num % 10;
      num = Math.floor(num / 10);
    }
    num = sum;
  }
  return num;
}

console.log(repeatedSum(456)); // Output: 6