const path = require('path')

module.exports = {
    mode: 'production',
    entry: {
        index: path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vue: {
                    name: 'vue',
                    minSize: 1024,
                    chunks: 'all',
                }
            }
        }  
    },
    cache: true
}