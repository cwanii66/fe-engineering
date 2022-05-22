function createEventStream(heartbeat) {
    let clientId = 0;
    let clients = {};

    function everyClient(fn) {

    }
    let interval = setInterval(function heartbeatTick() {
        everyClient(function(client) {

        })
    }, heartbeat).unref();
    return {
        close() {},
        handler() {},
        publish() {}
    }
}

function co(gen) {
    const ctx = this;
    
    return new Promise(function(resolve, reject) {
        if (typeof gen === 'function') gen = gen.call(ctx);
        if (!gen || typeof gen.next !== 'function') return resolve(gen);

        onFulfilled();
        function onFulfilled(res) {
            let ret;
            try {
                ret = gen.next(res);
            } catch(e) {
                return reject(e);
            }
            next(ret);
        }

        function next(ret) {
            // call next itself recursively
        }
    });
}

// 1. cancel promise

class CancelToken {
    constructor(cancelFn) {
        this.promise = new Promise((resolve, reject) => {
            cancelFn(resolve)
        })
    }
}

// 2. trackable promise
class TrackablePromise extends Promise {
    constructor(executor) {
        const notifyHandlers = []
        super((resolve, reject) => {
            return executor(resolve, reject, (status) => {
                notifyHandlers.map(handler => handler(status))
            })
        })
        this.notifyHandlers = notifyHandlers
    }
    notify(notifyHandler) {
        this.notifyHandlers.push(notifyHandler)
        return this;
    }
}