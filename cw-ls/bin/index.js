#!/usr/bin/env node

const fs = require('fs')
const parse = require('./argsParser.js')

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
    files.forEach((file, index, files) => {
        const mode = fs.statSync(file) // 拿到文件mode编码
        if (index === files.length - 1) {
            return output += file
        }
        output += file + '\n'
    })
}
console.log(output)