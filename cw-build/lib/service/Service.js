const path = require('path');
const fs = require('fs');
const WebpackChain = require('webpack-chain');
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
        this.plugins = []; // [ { mod, params }, {}, ]
        this.dir = process.cwd();
        this.webpackConfig = null;
        this.internalValue = {}; // basic of inter-communication among plugins
    }
    
    async start() {
        await this.resolveConfig();
        await this.registerHooks();
        await this.emitHooks(constant.HOOK_START, 'hook', 'start'); // hook -> start service
        await this.registerPlugin();
        await this.execPlugin();

        console.log(this.webpackConfig.toConfig());
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

        // Instantiate the configuration with a new API
        this.webpackConfig = new WebpackChain();

        // Make configuration change using the chain API
        // Every API call tracks a change to the stored configuration

        this.webpackConfig
            .entry('main')
                .add('src/index.js')
                .end()
            .output
                .path('dist')
                .filename('[name].bundle.js')
        this.webpackConfig.module
                .rule('lint')
                    .test(/\.js$/)
                    .include
                        .add('src')
                        .end()
                    .exclude
                        .add('node_modules')
                        .end()
                .use('eslint')
                    .loader('eslint-loader')
                    .options({
                        rules: {
                            semi: 'off'
                        }
                    })
        
        this.webpackConfig
                    .plugin('clean')
                    .use('webpack-chain', [{ root: '/dir' }])
        this.webpackConfig
                    .plugins
                    .clear()
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
        for (const plugin of this.plugins) {
            const { mod, params = {} } = plugin;
            if (!mod) continue;
            const API = {
                getWebpackConfig: this.getWebpackConfig,
                emitHooks: this.emitHooks,
                setValue: this.setValue,
                getValue: this.getValue,
                log
            };
            const options = {
                ...params,
            };
            await mod(API, options);
        }
    }

    getWebpackConfig = () => {
        return this.webpackConfig;
    }

    setValue = (key, value) => {
        this.internalValue[key] = value;
    }

    getValue = (key) => {
        return this.internalValue[key];
    }
}

module.exports = Service;