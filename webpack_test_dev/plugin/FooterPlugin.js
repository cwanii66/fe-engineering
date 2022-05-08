const { ConcatSource } = require('webpack-sources');

class FooterPlugin {
    constructor(options) {
        console.log('FooterPlugin ', options);
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.compilation.tap('FooterPlugin', compilation => {
            compilation.hooks.processAssets.tap('FooterPlugin', () => {
                for (const chunk of compilation.chunks) {
                    for (const file of chunk.files) {
                        console.log('files', file);
                        const comment = `/* ${this.options.footer} */`;
                        compilation.updateAsset(file, old => new ConcatSource(old, '\n', comment));
                    }
                }
            });
        });
    }
}

module.exports = FooterPlugin;