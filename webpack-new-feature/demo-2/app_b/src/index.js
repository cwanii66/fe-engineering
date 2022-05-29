console.log('主应用启动中...')

import('main/moduleA').then(res => {
    const moduleA = res.default
    console.log(moduleA())
})