const path = require('path');
const fs = require('fs');
const log = require('../utils/log');
const { getConfigFile, loadModule } = require('../utils/index');
const constant = require('./const');

const HOOK_KEYS = [
    constant.HOOK_START
]; // allowed hooks

class Service {
    constructor(opts) {
        this.args = opts;
        this.config = {};
        this.hooks = {};  // { <string>: [ fn,fn, ...] }
        this.plugins = []; // [ {}, {}, ]
        this.dir = process.cwd();
    }
    
    async start() {
        await this.resolveConfig();
        await this.registerHooks();
        await this.emitHooks(constant.HOOK_START, 'hook', 'start'); // hook -> start service
        await this.registerPlugin();
        await this.execPlugin();
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
            this.config = await loadModule(configFilePath);
            log.verbose('config', this.config);
        } else {
            console.log('config file does not exist, end process...');
            process.exit(1);
        }
    }

    async registerHooks() {
        // [ ['init', function() {}], ['init', function() {}] ]
        const { hooks } = this.config;
        if (hooks && hooks.length > 0) {
            for (const hookDefArr of hooks) {
                const [ hookName, hookFn ] = hookDefArr;
                if (hookName && hookFn && typeof hookName === 'string' && HOOK_KEYS.includes(hookName)) {
                    if (typeof hookFn === 'function') {
                        const definedHook = this.hooks[hookName];
                        if (!definedHook) {
                            this.hooks[hookName] = [];
                        }
                        this.hooks[hookName].push(hookFn);
                    } else if (typeof hookFn === 'string') {
                        const newFn = await loadModule(hookFn);
                        const definedHook = this.hooks[hookName];
                        if (!definedHook) {
                            this.hooks[hookName] = [];
                        }
                        this.hooks[hookName].push(newFn);
                    }
                }
            }
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

    async registerPlugin() {
        let { plugins } = this.config;
        if (plugins) {
            if (typeof plugins === 'function') {
                plugins = plugins();
            }
            if (Array.isArray(plugins)) {
                for (const plugin of plugins) {
                    if (typeof plugin === 'string') {
                        const mod = await loadModule(plugin);
                        this.plugins.push({ mod });
                    } else if (Array.isArray(plugin)) {
                        const [ pluginPath, pluginParam ] = plugin;
                        const mod = await loadModule(pluginPath);
                        this.plugins.push({
                            mod,
                            params: pluginParam
                        });
                    } else if (typeof plugin === 'function') {
                        this.plugins.push({
                            mod: plugin
                        });
                    }
                }
            }
        }
    }

    async execPlugin() {
        console.log('runPlugin ', this.plugins)
    }
}

module.exports = Service;