import o from './moduleA'
import { ref } from 'vue'

// data:    protocol
import data from 'data:text/javascript, export default "hello webpack5"'
import func from 'data:text/javascript, export default function () { return { a: 1 } }'
console.log(data)
console.log(func().a)

// file:    protocol
import shield from 'file:///Users/chriswong/Desktop/LocalRepo/PersonalRepo/fe-engineering/webpack-new-feature/demo-1/img/jifen.jpeg'
console.log(shield)

// https&https:   protocol
import moduleA from 'http://imooc-dev.youbaobao.xyz/test/moduleA.js'
console.log(moduleA.a)

import moduleB from 'https://fast-learn-oss.youbaobao.xyz/tb/category6.png'
const imgNodeB = document.createElement('img')
imgNodeB.setAttribute('src', moduleB)
document.body.appendChild(imgNodeB)

const imgUrl = require('./assets/voucher.png')
const imgNode = document.createElement('img')
imgNode.setAttribute('src', imgUrl)
document.body.appendChild(imgNode)

console.log('hello webpack5')
const reactVal = ref({})
console.log(reactVal.value)
const obj = { c: 3, d: 4 }
console.log(o.a)
export { obj as default }