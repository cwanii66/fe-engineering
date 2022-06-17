
console.log('11111111111')
console.log(process.argv)

console.log(process.pid)
console.log(process.ppid)

process.on('message', data => {
    console.log('message from main process');
    console.log(data)
});
process.send('hello main process');