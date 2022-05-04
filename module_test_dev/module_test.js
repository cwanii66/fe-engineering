const foo = (function coolModule(id) {
    const something = 'cool'
    const another = [1, 2, 3]
    
    function doSomething() {
        console.log(something)
    }
    function doAnother() {
        console.log(another.join('|'))
    }
    function identify() {
        console.log(id)
    }
    function change() {
        // change public api
        publicAPI.identify = identify2
    }
    function identify2() {
        console.log(id.toUpperCase())
    }
    const publicAPI = { // the returned object is commonly called module instance
        doSomething,
        doAnother,
        change,
        identify
    }
    return publicAPI;
})('foo module')

// foo.doSomething();
// foo.doAnother();
// foo.identify();
// foo.change();
// foo.identify();


const MyModules = (function Manager() {
    const modules = {}; // namespaced module package

    /**
     * 
     * @param {*} name define module name
     * @param {*} deps module dependencies for impl
     * @param {*} impl define current implementation
     */
    function define(name, deps, impl) {
        // load dependencies
        for (let i = 0; i < deps.length; i++) {
            // replace the real module from the top modules
            deps[i] = modules[deps[i]];
        }
        modules[name] = impl.apply(impl, deps);
    }

    function get(name) {
        return modules[name];
    }

    return {
        define,
        get
    }
})();

MyModules.define('bar', [], function() {
    function hello(who) {
        return 'let me introduce: ' + who;
    }
    return function() {
        return hello;
    };
});
MyModules.define('baz', ['bar'], function(bar) {
    const hungry = 'hippo';

    function awesome() {
        console.log(bar()(hungry).toUpperCase());
    }

    return {
        awesome
    };
});

const bar = MyModules.get('bar')();
const baz = MyModules.get('baz');

console.log(bar('hippo'));
console.log(baz.awesome());