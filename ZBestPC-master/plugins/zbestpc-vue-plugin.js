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
        .clear()
        .add(path.resolve(dir, './src/main.js'))
        .end()

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
                template: path.resolve(dir, './public/index.html'),
                filename: 'index.html',
                chunks: ['main', 'common']
            }
        ]);

    webpackConfig.plugin('ProvidePlugin')
        .use(webpack.ProvidePlugin, [
            {
                $: 'jquery',
                jQuery: 'jquery'
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
    webpackConfig.plugin('VueLoaderPlugin')
        .use(VueLoaderPlugin);

}