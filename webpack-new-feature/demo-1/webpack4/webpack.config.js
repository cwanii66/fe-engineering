const path = require('path')
const HardSourcePlugin = require('hard-source-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: {
        index: path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(jpg|jpeg|png|gif|webp|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name][hash:5].[ext]',
                            limit: 1024,
                            outputPath: 'images'
                        }
                    }
                ]
            }
        ]
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
    plugins: [
        new HardSourcePlugin({
            // Either an absolute path or relative to webpack's options.context.
            cacheDirectory: path.resolve(__dirname, 'node_modules', '.temp_cache'),

        }),
    ]
}