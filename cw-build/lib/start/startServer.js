const chokidar = require('chokidar');
const path = require('path');
const cp = require('child_process')

function runServer() {
    // 启动webpack服务

    // 启动子进程的方式
    console.log('pid', process.pid)
    
    const scriptPath = path.resolve(__dirname, './devService.js');
    // fork 出来的child process支持内置通信通道
    const child = cp.fork(scriptPath, ['--port 8080', 'localhost']);
    // child.on('message', data => {
    //     // 接受来自子进程的消息
    //     console.log('message from child process')
    //     console.log(data)
    // });
    // child.send('hello child process');
}

function onChange(path) {
    try {
        throw new Error(1)
    } catch(e) {
        console.log(e)
    }
}

function runWatcher() {
    // 启动配置监听
    const configPath = path.resolve(__dirname, './config.json');
    const watcher = chokidar.watch(configPath)
        .on('change', onChange)
        .on('error', error => {
            console.error('file watch error: ', error);
            process.exit(1);
        });
}

module.exports = function startServer(args, opts, cmd) {
    // 1. 通过子进程启动webpack-dev-server服务
    // 1.1 子进程启动可以避免主进程收到影响
    // 1.2 子进程启动可以方便重启，解决webpack-dev-server配置修改后无法重启
    runServer();

    // 2. 监听配置修改(不管用webpack还是vite最终都会映射到一个配置文件上)
    runWatcher();
};