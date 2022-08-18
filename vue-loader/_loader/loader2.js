exports.default = function(content) {
    const { resourcePath, resourceQuery = '' } = this;
    console.log('loader2', resourcePath, resourceQuery);
    return content;
}

exports.pitch = function(a, b, data) {
    // intercept execution of loader, preprocess
    console.log('loader2, pitch');
    data.value = 'hello loader2';
}