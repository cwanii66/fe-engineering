const path = require('path');
const VueLoaderPlugin = require('vue-loader/dist/plugin')
module.exports = {
    entry: path.resolve(__dirname, 'index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /.vue$/,
                use: [
                    { loader: 'vue-loader' }
                ],
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
    ]
}