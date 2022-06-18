// const path = require('path');

import path from 'path';

const entry = 'src/main.js';

module.exports = {
    entry: path.isAbsolute(entry) ? entry : path.resolve(entry),
    plugins: [
        "cw-build-test"
    ]
}