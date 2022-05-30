#!/usr/bin/env node

const fs = require('fs')
const parse = require('./argsParser.js')

const dir = process.cwd()
const args = process.argv.slice(2)

const { isAll, isList } = parse(args)

let files = fs.readdirSync(dir)
let output = ''

if (!isAll) {
    files = files.filter(file => file.indexOf('.') !== 0)
}

if (!isList) {
    // 遍历当前文件夹下的所有文件，并剔除以 . 开头的文件或文件夹
    files.forEach(file => output += file + '\t')
} else {
    files.forEach((file, index, files) => {
        if (index === files.length - 1) {
            output += file
        }
        output += file + '\n'
    })
}
console.log(output)