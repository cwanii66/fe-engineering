// delete require.cache[require.resolve('./test.js')];
let mod = require('./test.js');

console.log(mod.counter);
mod.incCounter();
console.log(mod.counter);