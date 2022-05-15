let p1 = new Promise((rs, rj) => {
    rs( Promise.resolve('inner resolved promise') )
    console.log('1')
}).then((v) => { console.log(2, v) }, (reason) => { console.log('rejected') })
    .then(() => {
        console.log('3')
        throw new Error('2 Error')
    })
    .catch((reason) => { console.log(reason) })

console.log(p1)