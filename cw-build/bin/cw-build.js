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
    .command('split')
    .description('Split string to array')
    .argument('<string>', 'string to split')
    .option('--first', 'display just the first substring')
    .option('-s, --separator <char>', 'separator character', ',')
    .action((str, options) => {
        const limit = options.first ? 1 : undefined
        console.log(str.split(options.separator, limit))
    })

program.parse()
