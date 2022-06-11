const semver = require('semver')

exports.checkNode = function(minNodeVersion) {

    // 获取node版本号
    const nodeVersion = semver.valid(
        semver.coerce(process.version)
    )
    
    return (semver.satisfies(nodeVersion, `>=${minNodeVersion}`))


    /************ semver test **************/

    // // version 的有效性
    // // major.minor.patch
    // console.log(semver.valid('v1.0.0')) // 1.0.0
    // console.log(semver.clean(' =1.0.0 ')) // 1.0.0
    // console.log(semver.satisfies('1.2.3', '1.x || >=2.5.0 || 5.0.0 - 7.2.3')) // true
    // console.log(semver.validRange('6.0.0 - 8.0.0'))
    // console.log(semver.gt('1.2.3', '9.8.7')) // false
    // console.log(semver.lt('2.3.4', '9.8.6')) // true
    // console.log(semver.minVersion('>=1.0.0').version) // 1.0.0
    // console.log(semver.valid(semver.coerce('v2'))) // 2.0.0
    // console.log(semver.valid(semver.coerce('42.6.7.9.3-alpha'))) // 42.6.7
    // return true
}