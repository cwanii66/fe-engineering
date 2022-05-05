import { counter, incA, foo } from './test.js';

console.log(counter)
// console.log(++counter)  TypeError: Assignment to constant variable
incA();
console.log(counter)

console.log(foo);
setTimeout(() => console.log(foo), 500);
