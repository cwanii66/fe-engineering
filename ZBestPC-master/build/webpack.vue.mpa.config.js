const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const CopyPlugin = require('copy-webpack-plugin');

const config = {
    mode: 'development',
    entry: {
        home: path.resolve(__dirname, '../src/mpa/home.js'),
        login: path.resolve(__dirname, '../src/mpa/login.js')
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, '../dist')
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, '../dist')
        },
        compress: true,
        port: 9000,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' }
                ]
            },
            {
                test: /\.(png|svg|gif|jpg|jpeg)$/i, // deal with image assests
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024
                    }
                },
                generator: {
                    filename: 'images/[name].[hash:6][ext]',
                }
            },
            {
                test: /\.vue$/,
                use: { loader: 'vue-loader' }
            },
        ],
    },
    optimization: {
        minimize: true,
        usedExports: true,
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin(),
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 100 * 1024,
            name: 'common',
            cacheGroups: {
                vue: {
                    test: /[\\/]node_modules[\\/](vue)[\\/]/,
                    name: 'vue',
                    chunks: 'all',
                },
                jquery: {
                    test: /jquery\.js/,
                    name: 'jquery',
                    chunks: 'all'
                },
                'lodash-es': {
                    test: /lodash-es/,
                    name: 'lodash-es',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            filename: 'home.html',
            chunks: ['home']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            filename: 'login.html',
            chunks: ['login']
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../src/img'),
                    to: path.resolve(__dirname, '../dist/img')
                },
            ]
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].chunk.css'
        }),
        new VueLoaderPlugin(),
    ]
};

module.exports = config;