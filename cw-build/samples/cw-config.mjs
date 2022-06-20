
export default {
    entry: 'src/main.js',
    plugins: function() {
        return [
            ['cw-build-test', { a: 1, b: 2 }],
            function() {
                console.log('anonymous plugin')
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