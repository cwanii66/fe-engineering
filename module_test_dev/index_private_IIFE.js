// closure scoped --> private
(function(global) {
    let a = 1;
    function api() {
        return {
            code: 0,
            data: {
                a: 1,
                b: 2
            }
        }
    }
    function handle(data) {
        return data.data;
    }
    function sum(a, b) {
        return a + b;
    }

    function getA() { return a }
    function setA(newA) { a = newA }

    global.__Module = {
        // a, // a: a
        getA,
        setA,
        api,
        handle,
        sum
    }
})(window);

const data = __Module.api();
const { a, b } = __Module.handle(data);
const c = __Module.sum( a, b );

console.log(c);
console.log(__Module.getA());
console.log(__Module.setA(2));
console.log(__Module.getA());


// Warning: variables in function scope is totally different from the object properties we expose.

// console.log(__Module.a === __Module.getA());
// __Module.a = 'a';
// console.log(__Module.a);
// console.log(__Module.getA());
