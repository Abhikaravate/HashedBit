// 1. Variable Declaration and Scope Differences
function variableScope() {
    var x = "function scope"; 
    let y = "block scope";
    const z = "block scope constant";
}
console.log("question 1:")
console.log("var is function-scoped, let and const are block-scoped. const cannot be reassigned.");
console.log(" ");

// 2. Fruits Array and Return Second Element
const fruits = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];
console.log("question 2:")
console.log(fruits[1]);
console.log(" ");


// 3. Push and Pop
function pushAndPop(arr) {
    arr.push("new element");
    arr.pop();
    return arr;
}
console.log("question 3:")
console.log(pushAndPop([1, 2, 3]));
console.log(" ");

// 4. Map to Square Numbers
const numbers = [1, 2, 3, 4, 5];

function squareNumbers(arr) {
    return arr.map(num => num * num);
}
console.log("question 4:")
console.log(squareNumbers(numbers));
console.log(" ");


// 5. Filter Odd Numbers
function getOddNumbers(arr) {
    return arr.filter(num => num % 2 !== 0);
}
console.log("question 5:")
console.log(getOddNumbers(numbers));
console.log(" ");

// 6. Person Object and Greeting
const person = {
    name: "John",
    age: 30,
    occupation: "Developer"
};

function greetPerson() {
    console.log(`Hello, I am ${person.name}, a ${person.age}-year-old ${person.occupation}.`);
}
console.log("question 6:")
greetPerson();
console.log(" ");


// 7. Area of Rectangle
function getArea(rect) {
    return rect.width * rect.height;
}
console.log("question 7:");
const rectangle = { width: 10, height: 5 };
console.log(getArea(rectangle)); 
console.log(" ");   

// 8. Object Keys
function getObjectKeys(obj) {
    return Object.keys(obj);
}
console.log("question 8:");
console.log(getObjectKeys(person));
console.log(" ");


// 9. Merge Objects
function mergeObjects(obj1, obj2) {
    return Object.assign({}, obj1, obj2);
}
console.log("question 9:");
const objA = { a: 1, b: 2 };
const objB = { b: 3, c: 4 };
console.log(mergeObjects(objA, objB));
console.log(" ");

// 10. Reduce to Sum
const numberArray = [10, 20, 30, 40];

function sumNumbers(arr) {
    return arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}
console.log("question 10:");
console.log(sumNumbers(numberArray));   
console.log(" "); 