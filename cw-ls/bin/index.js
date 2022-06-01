#!/usr/bin/env node

const fs = require('fs')
const parse = require('./argsParser.js')
const auth = require('./auth.js')
const getFileType = require('./getFileType.js')
const getFileUser = require('./getFileUser.js')

const dir = process.cwd()
const args = process.argv.slice(2)

const { isAll, isList } = parse(args)

let files = fs.readdirSync(dir)
let output = ''

if (!isAll) {
    files = files.filter(file => file.indexOf('.') !== 0)
}

if (!isList) {
    // 遍历当前文件夹下的所有文件，并剔除以 . 开头的文件或文件夹
    files.forEach(file => output += file + '\t')
} else {
    // Unix (linux macos) 文件权限体系
    // bin：rwx r-x r-x
    // package.json: rw- r-- r--
    // r: 访问、w：编辑、x：执行
    // u: 当前登录用户，g：当前登录用户所在分组，o：其他用户
    // node.js 如何获取文件权限？
    // Unix使用32位二进制数存储文件类型和权限
    // 0000 文件类型、 000 特殊权限、000 用户权限、 000 分组权限、 000其他权限
    // example: 0001: File   0100: Directory
    // bin: 16877 package.json: 33188

    // bin: 0100 0001 1110 1101
    // S_IFDIR: 0100 0000 0000 0000

    files.forEach((file, index, files) => {
        // const stat = fs.statSync(file) // 拿到文件mode编码
        // const mode = stat.mode
        // const isDir = mode & fs.constants.S_IFDIR  // mode跟相应4位二进制文件类型进行与操作
        // const isFile = mode & fs.constants.S_IFREG
        // console.log(isFile > 0)
        // console.log(isDir > 0) // 正结果isDir
        // console.log(
        //     mode, 
        //     'isDirectory:', stat.isDirectory(), // isDir > 0
        //     'isFile:', stat.isFile(), // isFile > 0
        // )
        const stat = fs.statSync(file)
        const mode = stat.mode
        const authString = auth(mode)
        const fileType = getFileType(mode)
        const fileUser = getFileUser(stat)

        if (index === files.length - 1) {
            return output += fileType 
                + 
                (authString + '\t' + file)
                +
                ('\t' + fileUser)
        }
        output += fileType 
            +
            (authString + '\t' + file)
            +
            ('\t' + fileUser)
            +
            '\n'
    })
}
console.log(output)