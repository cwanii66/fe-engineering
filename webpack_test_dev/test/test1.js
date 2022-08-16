// 取自 webpack/lib/compiler.js 
// 从创建 compiler 实例到调用 make 钩子
class Compiler {
    constructor() {
        // ...
    }
    compile(callback) {
        const params = this.newCompilationParams();
        this.hooks.beforeCompile.callAsync(params, err => {
            // ...
            const compilation = this.newCompilation(params);
            this.hooks.make.callAsync(compilation, err => {
                // ...
                this.hooks.finishMake.callAsync(compilation, err => {
                    // ...
                    process.nextTick(() => {
                        compilation.finish(err => {
                            compilation.seal(err => { });
                        });
                    });
                });
            });
        });
    }
}