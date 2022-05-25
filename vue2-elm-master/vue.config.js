const path = require('path')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

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
    }),
    devServer: {
        host: "localhost",
        port: 8080,
    }
}