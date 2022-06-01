const fs = require('fs')

module.exports = function auth(mode) {
    let authString = ''
    // usr
    const userRead = mode & fs.constants.S_IRUSR
    const userWrite = mode & fs.constants.S_IWUSR
    const userExecute = mode & fs.constants.S_IXUSR

    // group
    const groupRead = mode & fs.constants.S_IRGRP
    const groupWrite = mode & fs.constants.S_IWGRP
    const groupExecute = mode & fs.constants.S_IXGRP

    // others
    const othersRead = mode & fs.constants.S_IROTH
    const othersWrite = mode & fs.constants.S_IWOTH
    const othersExecute = mode & fs.constants.S_IXOTH

    userRead ? authString += 'r' : authString += '-'
    userWrite ? authString += 'w' : authString += '-'
    userExecute ? authString += 'x' : authString += '-'

    groupRead ? authString += 'r' : authString += '-'
    groupWrite ? authString += 'w' : authString += '-'
    groupExecute ? authString += 'x' : authString += '-'

    othersRead ? authString += 'r' : authString += '-'
    othersWrite ? authString += 'w' : authString += '-'
    othersExecute ? authString += 'x' : authString += '-'

    return authString
}