#!/usr/bin/env node

const fs = require('fs')
const parse = require('./argsParser.js')

const dir = process.cwd()
const args = process.argv.slice(2)

const { isAll, isList } = parse(args)

// pure ls mode
if (!isAll && !isList) {
    // 遍历当前文件夹下的所有文件，并剔除以 . 开头的文件或文件夹
    let files = fs.readdirSync(dir)
    files = files.filter(file => file.indexOf('.') !== 0)
    let output = ''
    files.forEach(file => output += file + '\t' )
    console.log(output)
}