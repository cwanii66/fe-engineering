
export default {
    entry: 'src/main.js',
    plugins: function() {
        return [
            ['cw-build-test', { a: 1, b: 2 }],
            
            function(api, options) {
                const config = api.getWebpackConfig();
                config.module
                    .rule('eslint')
                    .test(/\.mjs/)
                    .exclude
                        .add('node_modules')
                        .end()
                    .use('eslint')
                        .loader('eslint-loader')
                        .options({
                            rules: {
                                semi: 'on'
                            }
                        })
                console.log('anonymous plugin', config.toConfig(), options);
            }
        ]
    },
    hooks: [
        // [ 
        //     'start', 
        //     function(...args) {
        //         console.log('start', args);
        //     } 
        // ],
        ['plugin', (webpackConfig) => {
            // console.log('testHook', webpackConfig?.toConfig())
        }]
    ]
}