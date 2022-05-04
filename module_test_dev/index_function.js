// call server interface
function api() {
    return {
        statusCode: 0,
        data: {
            a: 1,
            b: 2
        }
    }
}

// handle data
function handle(respondedData) {
    return respondedData.data
}

// data manipulation
function sum(a, b) {
    return a + b
}

const data = api();
const { a, b } = handle(data);
const c = sum( a, b );

console.log(c);