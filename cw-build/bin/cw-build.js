#!/usr/bin/env node

const commander = require('commander');
const pkg = require('../package.json');

const { checkNode } = require('../lib/checkNode');

const MIN_NODE_VERSION = '8.9.0';

(async () => {
    try {
       if (!checkNode(MIN_NODE_VERSION)) {
            throw new Error('Node version Error');
        }
    } catch(e) {
        console.log(e.message);
    }
    
})();