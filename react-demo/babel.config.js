const presets = [
    [
        '@babel/preset-env'
    ],
    [
        '@babel/preset-typescript',
        {
            optimizeConstEnums: true,
        },
    ]
];

module.exports = {
    presets,
};