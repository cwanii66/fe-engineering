exports.default = function(content) {
    const { resourcePath, resourceQuery = '' } = this;
    console.log('loader3', resourcePath, resourceQuery);
    return content;
}

exports.pitch = function(a, b, data) {
    // intercept execution of loader, preprocess
    console.log('loader3, pitch');
    data.value = 'hello loader3';
}