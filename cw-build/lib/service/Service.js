const path = require('path');
const fg = require('fast-glob');

const DEAFULT_CONFIG_NAME = 'cw-config';
class Service {

    constructor(opts) {
        this.args = opts;
        this.config = {};
        this.hooks = {};
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
            
        }
    }
}

module.exports = Service;