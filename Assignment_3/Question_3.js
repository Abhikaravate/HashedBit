let string = 'INDIA';
let arr = string.split('');

arr.splice(3, 2, 'O', 'N', 'E', 'S', 'I', 'A'); 

console.log(arr.join(''));