const fs = require('fs')

module.exports = function auth(mode) {
    let authString = ''
    // u r
    const userRead = mode & fs.constants.S_IRUSR
    const userWrite = mode & fs.constants.S_IWUSR
    const userExecute = mode & fs.constants.S_IXUSR

    userRead ? authString += 'r' : authString += '-'
    userWrite ? authString += 'w' : authString += '-'
    userExecute ? authString += 'x' : authString += '-'

    return authString
}