#!/usr/bin/env node

const commander = require('commander');
const { Command, Option, Argument } = commander
const pkg = require('../package.json');
const path = require('path');

const { checkNode } = require('../lib/utils/checkNode');
const startServer = require('../lib/start/startServer');
const startBuild = require('../lib/build/build');

const program = new Command();

const MIN_NODE_VERSION = '8.9.0';

(async () => {
    try {
        if (!checkNode(MIN_NODE_VERSION)) {
            throw new Error('Node version Error');
        }

        program.version(pkg.version)

        program
            .command('start')
            .description('start cw-build server')
            .addOption(new Option('-c, --config <config>', 'config path'))
            .allowUnknownOption()
            .action(startServer)

        program
            .command('build')
            .description('build project with cw-build')
            .allowUnknownOption()
            .action(startBuild)
            
        program
            .option('-d --debug', 'start debug mode')
            .hook('preAction', (thisCommand, actionCommand) => {
                const opts = actionCommand.optsWithGlobals();
                const { debug = false } = opts;
                
                if (debug) {
                    process.env.LOG_LEVEL = 'verbose';
                } else {
                    process.env.LOG_LEVEL = 'info';
                }
            })

        program.parse() // implicitly use process.argv and auto-detect node vs electron conventions

    } catch(e) {
        console.log(e.message);
    }
    
})();