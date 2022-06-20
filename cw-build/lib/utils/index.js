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
    let hookFnPath;
    // node_module or path ?
    if (modulePath.startsWith('/') || modulePath.startsWith('.')) {
        hookFnPath = path.isAbsolute(modulePath) ? modulePath : path.resolve(modulePath);
    } else {
        hookFnPath = require.resolve(modulePath, {
            paths: [
                path.resolve(process.cwd(), 'node_modules') 
            ]
        }); // we just want the path to a file(alternative of path.join(__dirname, <path>)), support node_modules traverse
    }
    
    if (fs.existsSync(hookFnPath)) {
        const isMjs = hookFnPath.endsWith('mjs');
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