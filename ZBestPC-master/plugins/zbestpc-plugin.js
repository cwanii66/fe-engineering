const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = function(api, options) {
    const dir = process.cwd();
    const { getWebpackConfig } = api;
    const webpackConfig = getWebpackConfig();

    webpackConfig.entry('login')
        .add(path.resolve(dir, './src/login.js'))
        .end()
    
    webpackConfig.module
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
    webpackConfig.plugin('HtmlWebpackPlugin2')
        .use(HtmlWebpackPlugin, [
            {
                template: path.resolve(dir, './public/login.html'),
                filename: 'login.html',
                chunks: ['login']
            }
        ]);

    webpackConfig.plugin('ProvidePlugin')
        .use(webpack.ProvidePlugin, [
            {
                '$': 'jquery',
                'jQuery': 'jquery'
            }
        ]);

    webpackConfig.plugin('CopyPlugin')
        .use(CopyPlugin, [
            {
                patterns: [{
                    from: path.resolve(dir, './src/img'),
                    to: path.resolve(dir, './dist/img')
                }],
            }
        ]);

}