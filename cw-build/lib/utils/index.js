const path = require('path');
const fg = require('fast-glob');
const log = require('./log');

const DEAFULT_CONFIG_NAME = ['cw-config.(mjs|js|json)'];

function getConfigFile(cwd = process.cwd()) {
    const [ configFile ] = fg.sync(DEAFULT_CONFIG_NAME, { cwd, absolute: true });
    // log.verbose('configFile', configFile);
    return configFile;
}

module.exports = {
    getConfigFile
}