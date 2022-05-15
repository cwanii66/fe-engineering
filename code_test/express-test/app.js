const express = require('express')
// const https = require('https')
// const fs = require('fs')

const app = express()
const PORT = 8000

// const httpsPort = 443

// const options = {
//     key: {
//         key: fs.readFileSync('./https/'), // 私钥
//         cert: fs.readFileSync('./https/') // 公钥
//     }
// }

// 同构部署 前端和后端的代码同构在一起的实现
app.use('/static', express.static('./static'))

app.use(function(req, res, next) {
    // res.send('Express server middleware..')
    console.log('step 1')

    throw new Error('error message!')
})


app.use(function(req, res, next) {
    console.log('step 2')
    new Promise((resolve, reject) => {
        console.log('Promise resolved below')
        resolve()
    }).then(() => {
        console.log('then ..')
        throw new Error('promise error')
    })
})

// 1. 异常中间件全局只会包含一个
// 2. 异常中间件可以传递给普通中间件
// 3. 异常中间件需要放在所有中间件的最后
// 4. 异常中间件只能捕获回调函数中的异常
app.use(function(err, req, res, next) {
    console.log('err!', err.message)
    next()
})

// global exception capture
process.on('uncaughtException', function(err) {
    console.error('Error: uncaughtException --> ', err.message)
})

// global promise exception capture
process.on('unhandledRejection', function(err) {
    console.error('Error: unhandledRejection --> ', err.message)
})

app.listen(PORT, function() {
    console.log(`express is listening on port ${PORT}`)
})

// const httpsServer = https.createServer(options, app);

// httpsServer.listen(httpsPort, function() {
//     console.log('https 服务启动成功 -> Port: ' + httpsPort)
// })
