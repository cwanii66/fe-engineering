const path = require('path');
const fs = require('fs');
const log = require('../utils/log');
const { getConfigFile } = require('../utils/index');

class Service {

    constructor(opts) {
        this.args = opts;
        this.config = {};
        this.hooks = {};  // { <string>: [ fn,fn, ...] }
        this.dir = process.cwd();
    }
    
    async start() {
        await this.resolveConfig();
        this.registerHooks();
    }

    async resolveConfig() {
        const { config } = this.args;
        let configFilePath = '';

        if (config) {
            if (path.isAbsolute(config)) {
                configFilePath = config;
            }
            configFilePath = path.resolve(config);
        } else {
            configFilePath = getConfigFile();
            // log.verbose('configFilePath: ', configFilePath);
        }

        if (configFilePath && fs.existsSync(configFilePath)) {
            const isMjs = configFilePath.endsWith('mjs');
            if (isMjs) {
                this.config = (await import(configFilePath)).default;
            } else {
                this.config = require(configFilePath);
            }
            // log.verbose('config', this.config);
        } else {
            console.log('config file does not exist, end process...');
            process.exit(1);
        }
    }

    registerHooks() {
        // [ ['init', function() {}], ['init', function() {}] ]
        const { hooks } = this.config;
        if (hooks && hooks.length > 0) {
           hooks.forEach((hookDefArr) => {
                const [ hookName, hookFn ] = hookDefArr;
                if (hookName && hookFn) {
                    if (typeof hookName === 'string' && typeof hookFn === 'function') {
                        const definedHook = this.hooks[hookName];
                        if (!definedHook) {
                            this.hooks[hookName] = [];
                        }
                        this.hooks[hookName].push(hookFn);
                    }
                }
            }); 
        }
    }

    emitHooks(hooks) {

    }
}

module.exports = Service;