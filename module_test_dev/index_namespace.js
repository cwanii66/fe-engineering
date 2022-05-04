window.__Module = {

    // call server interface
    api: function() {
        return {
            statusCode: 0,
            data: {
                a: 1,
                b: 2
            }
        }
    },

    // handle data
    handle: function(respondedData) {
        return respondedData.data
    },

    // data manipulation
    sum: function(a, b) {
        return a + b
    }
}


const data = __Module.api();
const { a, b } = __Module.handle(data);
const c = __Module.sum( a, b );

console.log(c);