const chokidar = require('chokidar');
const path = require('path');
const cp = require('child_process');
const log = require('../utils/log');
const { getConfigFile } = require('../utils/index');

let child;

function runServer(arg = {}) {
    const { config = '' } = arg;
    // 启动webpack服务

    const scriptPath = path.resolve(__dirname, './devService.js');
    // fork 出来的child process支持内置通信通道
    child = cp.fork(scriptPath, ['--port 8080', `--config ${config}`]);

    child.on('exit', (code) => {
        if (code) {
            process.exit(code);
        }
    });
}

function onChange(path) {
    log.verbose('config changes...');
    child.kill();
    runServer();
}

function runWatcher() {
    // 启动配置监听
    const configPath = getConfigFile();
    
    const watcher = chokidar.watch(configPath);
    watcher
        .on('change', onChange)
        .on('error', error => {
            console.error('file watch error: ', error);
            process.exit(1);
        });
}

module.exports = function startServer(opts, cmd) {
    // 1. 通过子进程启动webpack-dev-server服务
    // 1.1 子进程启动可以避免主进程收到影响
    // 1.2 子进程启动可以方便重启，解决webpack-dev-server配置修改后无法重启
    runServer(opts);

    // 2. 监听配置修改(不管用webpack还是vite最终都会映射到一个配置文件上)
    runWatcher();
};