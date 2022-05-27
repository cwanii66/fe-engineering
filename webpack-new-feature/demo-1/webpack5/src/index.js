import o from './moduleA'
import { ref } from 'vue'

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