#!/usr/bin/env node

const commander = require('commander');
const { Command, Option, Argument } = commander
const pkg = require('../package.json');

const { checkNode } = require('../lib/checkNode');
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