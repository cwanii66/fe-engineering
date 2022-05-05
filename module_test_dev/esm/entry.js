import { api, handle } from './api.js'
// require('./api')   yean, commonjs cache
import { sum } from './sum.js'

// 业务逻辑拼装执行入口
const data = api();
const { a, b } = handle(data);
const c = sum( a, b );

console.log(c);
// console.log(this === module.exports); // true
// console.log(require)
// console.log(module)
// require、module、__filename、__dirname ... 是模块IIFE的参数列表，所以我们可以在模块里直接使用
// console.log(arguments)


// console.log(this)   esmodule -> undefined