const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
                .loader(MiniCssExtractPlugin.loader)
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

    config
        .plugin('mini-css')
        .use(MiniCssExtractPlugin, [
            {
                filename: 'css/[name].css',
                chunkFilename: 'css/[name].chunk.css'
            }
        ]);
    config
        .plugin('HtmlWebpackPlugin')
        .use(HtmlWebpackPlugin, [
            {
                template: path.resolve(dir, './src/index.html'),
                filename: 'index.html',
                chunks: ['index']
            },
            {
                template: path.resolve(dir, './src/login.html'),
                filename: 'login.html',
                chunks: ['login']
            }
        ]);
    config
        .plugin('ProvidePlugin')
        .use(webpack.ProvidePlugin, [
            {
                '$': 'jquery',
                'jQuery': 'jquery'
            }
        ]);
    config
        .plugin('CopyPlugin')
        .use(CopyPlugin, [
            {
                patterns: [{
                    from: path.resolve(dir, './src/img'),
                    to: path.resolve(dir, './dist/img')
                }] 
            }
        ]);
    config
        .plugin('CleanPlugin')
        .use(CleanWebpackPlugin)
        
    
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         template: path.resolve(__dirname, '../src/index.html'),
    //         filename: 'index.html',
    //         chunks: ['index']
    //     }),
    //     new HtmlWebpackPlugin({
    //         filename: 'login.html',
    //         template: path.resolve(__dirname, '../src/login.html'),
    //         chunks: ['login']
    //     }),
    //     new webpack.ProvidePlugin({
    //         $: 'jquery',
    //         jQuery: 'jquery'
    //     }),
    //     new CopyPlugin({
    //         patterns: [
    //             {
    //                 from: path.resolve(__dirname, '../src/img'),
    //                 to: path.resolve(__dirname, '../dist/img')
    //             },
    //         ]
    //     }),
    //     new MiniCssExtractPlugin({
    //         filename: 'css/[name].css',
    //         chunkFilename: 'css/[name].chunk.css'
    //     }),
    //     new CleanWebpackPlugin(), // 清楚dist目录
    // ],
}