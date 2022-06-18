// const path = require('path');

import { isAbsolute } from 'path';

const entry = 'src/main.js';

module.exports = {
    entry: isAbsolute(entry) ? entry : path.resolve(entry),
    plugins: [
        "cw-build-test"
    ]
}