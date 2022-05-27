import o from './moduleA'
import { ref } from 'vue'

console.log('hello webpack5')
const reactVal = ref({})
console.log(reactVal)
const obj = { c: 3, d: 4 }
console.log(o.a)
export { obj as default }