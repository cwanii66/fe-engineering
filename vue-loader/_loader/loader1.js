exports.default = function(content) {
    const { resourcePath, resourceQuery = '' } = this;
    console.log('loader1', resourcePath, resourceQuery);
    if (resourceQuery === '?vue&type=template&id=123456') {
        return 'console.log(\'new code\');';
    } else {
        content = `import '${resourcePath}?vue&type=template&id=123456';\n${content}`;
    }
    console.log('loader1 content: ', content);
    return content;
}

exports.pitch = function(a, b, data) {
    // intercept execution of loader, preprocess
    console.log('loader1, pitch');
    data.value = 'hello loader1';
}