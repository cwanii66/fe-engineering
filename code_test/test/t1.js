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