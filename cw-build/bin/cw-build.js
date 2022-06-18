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
            .addOption(new Option('-c, --config <config>', 'config path').default(path.resolve(process.cwd(), 'cw-config.json')))
            .allowUnknownOption()
            .action(startServer)

        program
            .command('build')
            .description('build project with cw-build')
            .allowUnknownOption()
            .action(startBuild)
        
        program.parse() // implicitly use process.argv and auto-detect node vs electron conventions

    } catch(e) {
        console.log(e.message);
    }
    
})();