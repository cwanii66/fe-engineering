const fs = require('fs')

module.exports = function getFileType(mode) {
    const isDirectory = mode & fs.constants.S_IFDIR
    const isFile = mode & fs.constants.S_IFREG
    const isLink = mode & fs.constants.S_IFLNK

    if (isDirectory) {
        return 'd'
    } else if (isFile) {
        return '-'
    } else if (isLink) {
        return 'l'
    }
}