let counter = 1;
function incCounter() {
    counter++;
}

module.exports = {
    get counter() {
        return counter;
    },
    incCounter
}