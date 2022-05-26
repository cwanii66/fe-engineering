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
    parallel: false, // vue/cli 开启thread-loader config
    configureWebpack: smp.wrap({
        resolve: {
            alias: {
                'src': path.resolve(__dirname, './src'),
                'assets': path.resolve(__dirname, './src/assets'),
                'components': path.resolve(__dirname, './src/components')
            }
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