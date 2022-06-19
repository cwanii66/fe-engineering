const path = require('path');
const fg = require('fast-glob');
const log = require('./log');
const fs = require('fs');

const DEAFULT_CONFIG_NAME = ['cw-config.(mjs|js|json)'];

function getConfigFile(cwd = process.cwd()) {
    const [ configFile ] = fg.sync(DEAFULT_CONFIG_NAME, { cwd, absolute: true });
    // log.verbose('configFile', configFile);
    return configFile;
}

/**
 * @param {*} modulePath
 * @returns {function}
 * @description pass into a path string, return a function module
 */
async function loadModule(modulePath) {
    let hookFnPath = path.isAbsolute(modulePath) ? modulePath : path.resolve(modulePath);
    hookFnPath = require.resolve(hookFnPath);

    if (fs.existsSync(hookFnPath)) {
        const isMjs = modulePath.endsWith('mjs');
        if (isMjs) {
            return (await import(hookFnPath)).default;
        } else {
            return require(hookFnPath);
        }
    }
    return null;
}

module.exports = {
    getConfigFile,
    loadModule
}