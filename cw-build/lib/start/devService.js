const detectPort = require('detect-port');

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
        }

        const net = require('net');
        const tcpServer = new net.Server();
        tcpServer.listen(8080, 'localhost', () => {
            console.log(tcpServer.address());
        });
        tcpServer.on('error', (error) => {
            console.log(error);
        });
        tcpServer.on('connection', (socket) => {
            console.log('socket connection');
            socket.write('write data\r\n');
            socket.on('data', (data) => {
                const event = data.toString();
                if (event === 'end') {
                    console.log('close connection');
                    socket.end();
                }
            });
        });
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