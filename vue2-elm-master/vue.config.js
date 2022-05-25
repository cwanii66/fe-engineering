const path = require('path')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// console.log(process.env)
const smp = new SpeedMeasurePlugin({
    disable: !(process.env.MEASURE === 'true'),
    outputFormat: 'human',
    
})

module.exports = {
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
                analyzerMode: 'server',
                analyzerHost: '127.0.0.1',
                analyzerPort: 8888,
                reportFilename: 'analyze.html',
                reportTitle: () => `elm [${ Date.now() }]`,
                statsFilename: 'stats.json',
                statsOptions: null,
                excludeAssets: null,
                logLevel: 'info'
            })
        ]
    }),
    devServer: {
        host: "localhost",
        port: 8080,
    }
}