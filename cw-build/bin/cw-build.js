#!/usr/bin/env node

const commander = require('commander')
const { Command, Option } = commander
const pkg = require('../package.json')

const program = new Command()

// Integer parser
function parseMyInt(string) {
    const intValue = parseInt(string, 10)
    if (isNaN(intValue)) {
        throw new commander.InvalidArgumentError('Not a Int Number')
    }
    return intValue
}

function increase(value, prev) {
    const v = Number(value)
    const p = prev ?? 0
    return v + p
}

function collect(value, prev) {
    console.log(value, prev)
    return prev.concat(value)
}

// 1. 生成脚手架的帮助文档： cw-build -h
// 2. 生成脚手架command的帮助文档： cw-build split -h / cw-build help split

program
    .name('cw-build')
    .description('CLI to build fe project')
    .version(pkg.version, '-v, --version', 'output version')

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

program
    .command('test')
    .addOption(new Option('-s, --select', 'select option').hideHelp(true))
    .addOption(new Option('-t, --timeout <delay>', 'timeout seconds').default(60, 'one minute'))
    .addOption(new Option('-c, --choice <choice>', 'your chioce').choices(['small', 'medium', 'large']))
    .addOption(new Option('-p, --port <number>', 'your port number').env('PORT'))
    .addOption(new Option('-d, --donate [amount]', 'donation in dollars').preset('20').argParser(parseFloat))
    .addOption(new Option('--disable-server', 'disable server').conflicts(['port', 'choice']))
    .action((options, cmd) => {
        console.log(cmd.optsWithGlobals())
    })

program
    .command('custom')
    .option('-f --float <number>', 'float argument', parseFloat)
    .option('-i --integer <number>', 'integer number', parseMyInt)
    .option('--verbose <number>', 'verbose option', increase)
    .option('-c --collect <value>', 'collect option', collect, [])
    
    .action((options, cmd) => {
        console.log(cmd.optsWithGlobals())
    })

program.parse()

// opts: 获取当前实例的options，全局program获取全局options，subcommand获取局部options
// optsWithGlobals: 获取全部options，全局program获取全局options，但是subcommand获取 ** 全局+局部options **
// const options = program.opts() // global options
// const globalOptions = program.globalOptions
// console.log(globalOptions)
// console.log(options)

// options 四种调用方式
// -s <char>
// -s<char>
// --separator <char>
// --separator=<char>
