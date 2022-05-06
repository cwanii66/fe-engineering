(function () {
    /**
     * @param {*} e loaded modules
     * @param {*} n active exports at current module
     * @param {*} t entry module list
     */
    function r(loadedModules, exportsModules, entryModules) {
        // require
        function o(moduleNum) {
            if (!exportsModules[moduleNum]) {
                if (!loadedModules[moduleNum]) {
                    // ...
                }
                let exportP = (exportsModules[moduleNum] = { exports: {} });
                loadedModules[moduleNum][0].call(
                    exportP.exports,
                    // pass the methods at module
                    function (r) {
                        let n = loadedModules[moduleNum][1][r]; // module dependencies
                        return o(n || r);
                    },
                    exportP,
                    exportP.exports,
                    r,
                    loadedModules,
                    exportsModules,
                    entryModules
                );
            }
            return exportsModules[moduleNum].exports;
        }

        for (let u = 'function' == typeof require && require, i = 0; 
            i < entryModules.length;
            i++
        ) o(entryModules[i]);

        return o;
    };

    return r;
})()(
    {
        1: [
            function(require, module, exports){/* inner module is bundled in */},
            {'./': 1}
        ],
        2: [
            function(require, module, exports){},
            {}
        ]
    },
    {},
    [2]
);