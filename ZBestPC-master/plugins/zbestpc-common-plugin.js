const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = function(api, options) {
    const dir = process.cwd();
    const { getWebpackConfig } = api;
    const webpackConfig = getWebpackConfig();

    webpackConfig.optimization
        .minimize(true);
    webpackConfig.optimization
        .minimizer('TerserPlugin')
        .use(TerserPlugin, []);
    webpackConfig.optimization
        .minimizer('CssMinimizerPlugin')
        .use(CssMinimizerPlugin, []);

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

}