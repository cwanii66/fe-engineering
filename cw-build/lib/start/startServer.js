const chokidar = require('chokidar');
const path = require('path');
const cp = require('child_process')

function runServer() {
    // 启动webpack服务

    // 启动子进程的方式
    console.log(process.pid)
    // 1. execFile()
    // cp.execFile('node', [path.resolve(__dirname, './devService.js'), '--force'], {}, (error, stdout, stderr) => {
    //     if (error) {
    //         throw error;
    //     }
    //     console.log(stdout)
    // })
    // const buffer = cp.execSync(`node ${path.resolve(__dirname, './devService.js')} --force`, {}, (error, stdout, stderr) => {});
    // console.log(buffer.toString())

    const child = cp.spawn('node', [path.resolve(__dirname, './devService.js'), '--force'])
    child.stdout.on('data', function(data) {
        console.log('stdout: ', data.toString())
    })
    child.stderr.on('data', data => {
        console.log('stderr: ', data.toString())
    })
    child.on('close', (code) => {
        console.log(`child process exited with code ${code}`)
    })

    // RPC remote process communicate
    
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