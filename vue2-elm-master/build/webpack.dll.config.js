const path = require('path')
const webpack = require('webpack')

const dllPath = '../dll'

module.exports = {
    mode: 'production',
    entry: {
        vue: [
            'vue', 
            'vue-router',
            'vuex'
        ]
    },
    output: {
        path: path.join(__dirname, dllPath),
        filename: '[name].dll.js',
        library: '[name]_[hash]',
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, dllPath, '[name]-manifest.json'),
            name: '[name]_[hash]',
            context: process.cwd(),
        })
    ]
}