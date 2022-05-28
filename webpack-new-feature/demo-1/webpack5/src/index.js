import o from './moduleA'
import { ref } from 'vue'

import data from 'data:text/javascript, export default "hello webpack5"'
import func from 'data:text/javascript, export default function () { return { a: 1 } }'
console.log(data)
console.log(func().a)

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