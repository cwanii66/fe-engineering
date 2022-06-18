
class Service {
    constructor(opts) {
        this.args = opts;
        this.config = {};
        this.hooks = {};
    }
    
    async start() {
        this.resolveConfig();
    }

    resolveConfig() {
        console.log('resolve config')
    }
}

module.exports = Service;