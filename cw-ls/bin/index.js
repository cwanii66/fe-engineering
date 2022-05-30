#!/usr/bin/env node

const parse = require('./argsParser.js')

const args = process.argv.slice(2)

const { isAll, isList } = parse(args)

console.log(args, isAll, isList)