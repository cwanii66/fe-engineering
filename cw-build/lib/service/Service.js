const path = require('path');
const fs = require('fs');
const fg = require('fast-glob');
const log = require('../utils/log');

const DEAFULT_CONFIG_NAME = ['cw-config.(mjs|js|json)'];
class Service {

    constructor(opts) {
        this.args = opts;
        this.config = {};
        this.hooks = {};
        this.dir = process.cwd();
    }
    
    async start() {
        this.resolveConfig();
    }

    resolveConfig() {
        const { config } = this.args;
        let configFilePath = '';

        if (config) {
            if (path.isAbsolute(config)) {
                configFilePath = config;
            }
            configFilePath = path.resolve(config);
        } else {
            const [ configFile ] = fg.sync(DEAFULT_CONFIG_NAME, { cwd: this.dir, absolute: true });
            configFilePath = configFile;
        }

        if (configFilePath && fs.existsSync(configFilePath)) {
            this.config = require(configFilePath);
            log.verbose('config', this.config)
        } else {
            console.log('config file does not exist, end process...');
            process.exit(1);
        }
    }
}

module.exports = Service;