const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        login: './src/login.js'
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, './dist')
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' }
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024
                    }
                },
                generator: {
                    filename: 'images/[name].[hash:6][ext]',
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            filename: 'index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            filename: 'login.html',
            template: path.resolve(__dirname, 'src/login.html'),
            chunks: ['login']
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/img'),
                    to: path.resolve(__dirname, 'dist/img')
                },
            ]
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].chunk.css'
        }),
    ],
};

module.exports = config;