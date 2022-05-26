const path = require('path')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
// console.log(process.env)
const smp = new SpeedMeasurePlugin({
    disable: !(process.env.MEASURE === 'true'),
    outputFormat: 'human',
})

// console.log("require('os').cpus()", require('os').cpus())
module.exports = {
    publicPath: './',
    parallel: false, // vue/cli 开启thread-loader config
    configureWebpack: smp.wrap({
        cache: {
            type: 'filesystem',
            // cacheDirectory: path.resolve(__dirname, './node_modules/.cache_temp'),
            // name: 'vue2-elm'
            cacheLocation: path.resolve(__dirname, './node_modules/.cache_temp', 'vue2_elm'),
        },
        resolve: {
            alias: {
                'src': path.resolve(__dirname, './src'),
                'assets': path.resolve(__dirname, './src/assets'),
                'components': path.resolve(__dirname, './src/components')
            }
        },
        module: {
            rules: [
                {
                    test: /\.(gif|png|jpe?g|svg|webp)$/i,
                    use: [{
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.5, 0.65],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            webp: {
                                quality: 75
                            }
                        },
                    }]
                }
            ]
        },
        plugins: [
            new BundleAnalyzerPlugin({
                analyzerMode: process.env.MEASUER === 'true'
                                ?
                                'server'
                                :
                                'disabled',
                analyzerHost: '127.0.0.1',
                analyzerPort: 8888,
                reportTitle: () => {
                    const time = new Date()
                    const year = time.getFullYear()
                    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][time.getMonth()]
                    const day = time.getDate()
                    const hour = `0${time.getHours()}`.slice(-2)
                    const minute = `0${time.getMinutes()}`.slice(-2)
                    const currentTime = `${day} ${month} ${year} at ${hour}:${minute}`
                    return `${process.env.npm_package_name || 'Bundle Analyzer'} [${currentTime}]`
                },
                statsOptions: null,
                excludeAssets: null,
                logLevel: 'info'
            }),
            new webpack.DllReferencePlugin({
                context: process.cwd(),
                manifest: path.resolve(__dirname, './dll/vue-manifest.json')
            }),
            new AddAssetHtmlPlugin({
                filepath: path.resolve(__dirname, 'dll/vue.dll.js')
            })
        ]
    }),
    devServer: {
        host: "localhost",
        port: 8080,
    }
}