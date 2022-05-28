const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    optimization: {
        splitChunks: {
            minSize: 1 * 1024,
            chunks: 'all',
            name: 'vue'
        }
    },
    cache: {
        type: 'filesystem',
        cacheDirectory: path.resolve(__dirname, 'node_modules', '.cache_temp')
    },
    module: {
        rules: [
            {
                test: /\.(jpg|jpeg|png|gif|webp|svg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 1024,
                    }
                },
                generator: {
                    filename: 'images/[name][hash:5][ext]'
                }
            }
        ]
    },
    experiments: {
        buildHttp: {
            allowedUris: [
                'https://fast-learn-oss.youbaobao.xyz/',
                'http://imooc-dev.youbaobao.xyz',
            ],
            frozen: false,
            cacheLocation: false,
            upgrade: true
        },
    },
    devServer: {
        host: 'localhost',
        port: '3001'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'public/index.html')
        })
    ]
}

module.exports = config