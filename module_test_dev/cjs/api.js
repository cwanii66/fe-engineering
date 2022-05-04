const handle = require('./handle')
// console.log('Is api module cached?');
function api() {
    return {
        code: 0,
        data: {
            a: 1,
            b: 2
        }
    }
}

module.exports = {
    api,
    handle
}