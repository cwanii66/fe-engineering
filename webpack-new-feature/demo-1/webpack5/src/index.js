import o from './moduleA'

console.log('hello webpack5')

const obj = { c: 3, d: 4, e: o }
console.log(o.a)
export { obj as default }