const path = require('path');

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
    }
}