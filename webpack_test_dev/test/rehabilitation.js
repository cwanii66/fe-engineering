const Event = (function() {
    const clientList = {};
    
    const listen = function(key, fn) {
        if (!clientList[key]) {
            clientList[key] = [];
        }
        clientList[key].push(fn);
    };
    
    const trigger = function(key, ...args) {
        const fns = clientList[key];
        if (!fns || fns.length === 0) {
            return false;
        }
        for (let i = 0, fn; fn = fns[i++]; ) {
            fn.apply(this, args);
        }
    };

    const remove = function(key, fn) {
        const fns = clientList[key];
        if (!fns) {
            return false;
        }
        if (!fn) {
            fns && (fns.length = 0);
        } else {
            for (let l = fns.length - 1; l >= 0; l--) {
                const _fn = fns[l];
                if (_fn === fn) {
                    fns.splice(l, 1);
                }
            }
        }
    };
        
    return {
        listen,
        trigger,
        remove
    }
})();