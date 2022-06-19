const path = require('path');
const fg = require('fast-glob');

const DEAFULT_CONFIG_NAME = ['cw-config.(json|js|mjs)'];

function getConfigFile(cwd = process.cwd()) {
    const [ configFile ] = fg.sync(DEAFULT_CONFIG_NAME, { cwd, absolute: true });
    return configFile;
}

module.exports = {
    getConfigFile
}