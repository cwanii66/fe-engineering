const path = require('path');
const fs = require('fs');
const log = require('../utils/log');
const { getConfigFile } = require('../utils/index');

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
            configFilePath = getConfigFile();
            // log.verbose('configFilePath: ', configFilePath);
        }

        if (configFilePath && fs.existsSync(configFilePath)) {
            this.config = require(configFilePath);
            // log.verbose('config', this.config);
        } else {
            console.log('config file does not exist, end process...');
            process.exit(1);
        }
    }
}

module.exports = Service;