import { handle } from './handle.js'
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

export { api, handle }