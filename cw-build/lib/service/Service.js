const path = require('path');
const fs = require('fs');
const log = require('../utils/log');
const { getConfigFile } = require('../utils/index');
const constant = require('./const');

const HOOK_KEYS = [
    constant.HOOK_START
]; // allowed hooks

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

        this.emitHooks(constant.HOOK_START, 'hook', 'start'); // hook -> create service instance
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
            configFilePath = getConfigFile(this.dir);
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
                if (hookName && hookFn && HOOK_KEYS.includes(hookName)) {
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

    async emitHooks(key, ...args) {
        const hooks = this.hooks[key];
        try {
            for (let i = 0, hook; hook = hooks[i++]; ) {
                await hook.apply(this, args);
            }  
        } catch(e) {
            log.error(e);
        }
        
    }
}

module.exports = Service;