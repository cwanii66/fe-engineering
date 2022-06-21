
module.exports = function(api, options) {
    const { getWebpackConfig } = api;
    const config = getWebpackConfig();

    // 获取构建模式
    const mode = process.env.CW_BUILD_MODE || 'development';

    config.mode(mode)

    console.log('config: ', config.toConfig())
    // console.log('config: ', config.toConfig());
}