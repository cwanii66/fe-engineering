
export default {
    entry: 'src/main.js',
    plugins: [
        "cw-build-test"
    ],
    hooks: [
        [ 
            'created', 
            function(context) {
                console.log('created', context);
            } 
        ],
        [ 
            'configResolved', 
            function(context) {
                console.log('configResolved', context);
            } 
        ]
    ]
}