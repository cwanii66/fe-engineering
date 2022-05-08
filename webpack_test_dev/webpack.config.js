const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.cw$/,
                use: [
                    { loader: path.resolve(__dirname, './loader/cw-loader.js') }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: 'welcome to learning FE engineering.'
        })
    ]
}