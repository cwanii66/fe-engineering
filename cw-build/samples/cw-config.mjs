
export default {
    entry: 'src/main.js',
    plugins: [
        "cw-build-test"
    ],
    hooks: [
        [ 
            'start', 
            function(...args) {
                console.log('start', args);
            } 
        ],
    ]
}