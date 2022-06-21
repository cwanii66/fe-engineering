const path = require('path');

module.exports = function(api, options) {
    const { getWebpackConfig } = api;
    const config = getWebpackConfig();
    const dir = process.cwd();

    // 获取构建模式
    const mode = process.env.CW_BUILD_MODE || 'development';

    config.mode(mode)

    // 配置entry
    config.entry('index')
        .add(path.resolve(dir, './src/index.js'))
        .end();
    config.output
        .filename('js/[name].js')
        .path(path.resolve(dir, './dist'));
    
}