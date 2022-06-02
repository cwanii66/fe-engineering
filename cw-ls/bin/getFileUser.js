const cp = require('child_process')

module.exports = function getFileUser(stat) {
    const { uid, gid } = stat
    const userName = cp.execSync(`id -un ${ uid }`)
                        .toString()
                        .trim()

    const groupIdsString = cp.execSync(`id -G ${ uid }`)
                            .toString()
                            .trim()
    const groupIds = groupIdsString.split(' ')
    const groupIdsNameStr = cp.execSync(`id -Gn ${ uid }`)
                                .toString()
                                .trim()
    const groupIdsName = groupIdsNameStr.split(' ')

    const index = groupIds.findIndex(id => Number(id) === Number(gid))
    const groupName = groupIdsName[index]
    
    return (userName + ' ' + groupName)
}