#!/usr/bin/env node

const { Command } = require('commander')
const program = new Command()

// 1. 生成脚手架的帮助文档： cw-build -h
// 2. 生成脚手架command的帮助文档： cw-build split -h / cw-build help split

program
    .name('cw-build')
    .description('CLI to build fe project')
    .version('0.0.1')

program
    .option('-d --debug', 'debugging')
    .option('-g, --global', 'global')

program
    .command('split')
    .description('Split string to array')
    .argument('<string>', 'string to split')
    .option('-f --first', 'display just the first substring')  // options here are scoped at this command
    .requiredOption('-s, --separator <char>', 'separator character', ',') // 必须要加的option
    .option('-e, --extra', 'extra for something')
    .option('-a --add [string]', 'add something')
    .option('-l, --letter <letters...>', 'specify letters')
    .action((str, options, cmd) => {
        console.log(cmd.optsWithGlobals())
        const limit = options.first ? 1 : undefined
        console.log(str.split(options.separator, limit))
    })

program.parse()

// opts: 获取当前十里的options，全局program获取全局options，subcommand获取局部options
// optsWithGlobals: 获取全部options，全局program获取全局options，但是subcommand获取 ** 全局+局部options **
const options = program.opts() // global options
const globalOptions = program.globalOptions
// console.log(globalOptions)
// console.log(options)

// options 四种调用方式
// -s <char>
// -s<char>
// --separator <char>
// --separator=<char>
