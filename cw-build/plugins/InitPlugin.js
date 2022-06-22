const path = require('path');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
    
    // 设置loader
    config.module
        .rule('css')
            .test(/\.css$/i)
            .exclude
                .add(/node_modules/)
                .end()
            .use('mini-css')
                .loader('css-loader')
                .end()
            .use('css-loader')
                .loader('css-loader');

    config.module
        .rule('assets')
            .test(/\/(png|gif|svg|jpg|jpeg)$/i)
            .type('asset')
            .parser({
                dataUrlCondition: {
                    maxSize: 8 * 1024
                }
            });
    config.module.rule('asset').set('generator', {
        filename: 'images/[name].[hash:6][ext]',
    });

    config.module
        .rule('ejs')
            .test(/\.ejs/)
            .exclude
                .add(/node_modules/)
                .end()
            .use('ejs-loader')
                .loader('ejs-loader')
                .options({
                    esModule: false,
                });

    
}