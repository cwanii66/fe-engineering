#!/usr/bin/env node

const { program } = require('commander')

program
    .option('--first')
    .option('-s, --separator <char>')
    .option('-h, --help')

program.parse()

const options = program.opts()
const limit = options.first ? 1 : undefined // 代表分割参数的个数
// cw-build aaa/bbb/cc --first -s /

console.log(program.args[0].split(options.separator, limit))
