console.log('Hello webpack4')

import o from './moduleA'
import { createApp } from 'vue'

const imgUrl = require('./assets/voucher.png')

const imgNode = document.createElement('img')
imgNode.src = imgUrl
document.body.appendChild(imgNode)

createApp({})
console.log(o.a)

export default {
    b: 2
}