const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = function(api, options) {
    const dir = process.cwd();
    const { getWebpackConfig } = api;
    const webpackConfig = getWebpackConfig();

    webpackConfig.entry('index')
        .delete(path.resolve(dir, './src/index.js'))
        .add(path.resolve(dir, './src/main.js'))
        .end()

    webpackConfig.module
        .rule('vue')
        .test(/\.vue$/)
        .use('vue-loader')
            .loader('vue-loader');
    
    webpackConfig.optimization
        .minimize(true);
    webpackConfig.optimization
        .minimizer('TerserPlugin')
        .use(TerserPlugin, []);
    webpackConfig.optimization
        .minimizer('CssMinimizerPlugin')
        .use(CssMinimizerPlugin, []);
    webpackConfig.optimization
        .splitChunks({            
            chunks: 'all',
            minSize: 100 * 1024,
            name: 'common',
            cacheGroups: {
                vue: {
                    test: /[\\/]node_modules[\\/](vue)[\\/]/,
                    name: 'vue',
                    chunks: 'all',
                }
            }
        });

    webpackConfig.plugin('HtmlWebpackPlugin')
        .set('args', [
            {
                template: path.resolve(dir, './public/index-vue.html'),
                filename: 'index-vue.html',
                chunks: ['main']
            }
        ]);

    webpackConfig.plugin('VueLoaderPlugin')
        .use(VueLoaderPlugin, []);

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