const detectPort = require('detect-port');
const inquirer = require('inquirer');
const Service = require('../service/Service');

(async () => {
    const DEDAULT_PORT = 8000;

    const params = process.argv.slice(2);
    const paramObj = {};
    params.forEach((param, index) => {
        const paramArr = param.split(' ');
        const repalceKey = paramArr[0].replace('--', '');
        paramObj[repalceKey] = paramArr[1] ?? 'default';
    });
    console.log(paramObj)
    
    let defaultPort = Number(paramObj['port']) || DEDAULT_PORT;
    
    try {
        const newPort = await detectPort(defaultPort);
        if (newPort === defaultPort) {
            console.log(`port: ${defaultPort} was not occupied`);
        } else {
            console.log(`port: ${defaultPort} was occupied, try port: ${newPort}`);

            // 命令行交互
            const questions = {
                type: 'confirm',
                name: 'answer',
                message: `port: ${defaultPort} was occupied, try port: ${newPort}?`,
            };
            const answer = await inquirer.prompt(questions).answer;
            if (!answer) {
                process.exit(1);
            }
        }
        const args = {
            port: newPort,
        };
        process.env.NODE_ENV = 'development';
        const service = new Service(args);
        service.start();
    } catch(e) {
        console.log(e);
    }
})();





/********************** TEST BLOCK *************************** */
// console.log('11111111111')
// console.log(process.argv)

// console.log(process.pid)
// console.log(process.ppid)

// process.on('message', data => {
//     console.log('message from main process');
//     console.log(data)
// });
// process.send('hello main process');