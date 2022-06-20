
export default {
    entry: 'src/main.js',
    plugins: function() {
        return [
            ['cw-build-test', { a: 1, b: 2 }],
            function(api, options) {
                console.log('anonymous plugin', options);
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
    ]
}