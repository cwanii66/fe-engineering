const path = require('path')

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
            cacheGroups: { //cacheGroupKey here is `commons` as the key of the cacheGroup
                vue: { // expose to arguments of config fn value, called CacheGroupKey
                    name(cacheGroupKey) {
                        // console.log(typeof module)
                        // const chunksNames = chunks.map((item) => item.name).join('-')
                        // console.log(chunksNames)
                        // console.log(cacheGroupKey)
                        return cacheGroupKey
                    },
                }
            }
        }
    },
    cache: {
        type: 'filesystem',
    }
}

module.exports = config