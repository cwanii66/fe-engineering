console.log('Hello webpack4')

import o from './moduleA'
import { createApp } from 'vue'

createApp({})
console.log(o.a)

export default {
    b: 2
}