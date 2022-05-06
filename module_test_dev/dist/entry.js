(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw ((a.code = "MODULE_NOT_FOUND"), a);
        }
        var p = (n[i] = { exports: {} });
        e[i][0].call(
          p.exports,
          function (r) {
            var n = e[i][1][r]; 
            return o(n || r);
          },
          p,
          p.exports,
          r,
          e,
          n,
          t
        );
      }
      return n[i].exports;
    }
    for (
      var u = "function" == typeof require && require, i = 0;
      i < t.length;
      i++
    )
      o(t[i]);
    return o;
  }
  return r;
})()(
  {
    1: [
      function (require, module, exports) {
        const handle = require("./handle");
        console.log("Is api module cached?");
        function api() {
          return {
            code: 0,
            data: {
              a: 1,
              b: 2,
            },
          };
        }

        module.exports = {
          api,
          handle,
        };
      },
      { "./handle": 3 },
    ],
    2: [
      function (require, module, exports) {
        const { api, handle } = require("./api");
        // require('./api')   yean, commonjs cache
        const sum = require("./sum");

        // 业务逻辑拼装执行入口
        const data = api();
        const { a, b } = handle(data);
        const c = sum(a, b);

        console.log(c);
        console.log(this === module.exports); // true
        // console.log(require)
        // console.log(module)
        // require、module、__filename、__dirname ... 是模块IIFE的参数列表，所以我们可以在模块里直接使用
        // console.log(arguments)
      },
      { "./api": 1, "./sum": 4 },
    ],
    3: [
      function (require, module, exports) {
        module.exports = function handle(data) {
          return data.data;
        };
      },
      {},
    ],
    4: [
      function (require, module, exports) {
        function sum(a, b) {
          let c = a + b;
          return c;
        }

        // exports.a = 1;
        // exports.b = 2;

        module.exports = sum;
      },
      {},
    ],
  },
  {},
  [2]
);
