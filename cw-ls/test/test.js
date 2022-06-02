const assert = require("assert");
const parseArgs = require('../bin/argsParser')

describe('cw-ls', function() {
  describe('argsParser', function() {
    it('args test', function() {
      const { args, isList, isAll } = parseArgs()
      assert.equal(isList, false)
      assert.equal(isAll, false)
      assert.equal(args.length, 1)
      assert.equal(args[0], 'test/test.js')
    })
  })
})
