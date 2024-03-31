const chalk = require('chalk')
// 描述测试场景
function describe(desc, fn) {
  console.log(chalk.green(desc))
  fn()
}

// 单元测试用例描述
function it(desc, fn) {
  console.log(chalk.yellow(desc))
  fn()
}

function expect(result) {
  return {
    toBe(actual) {
      if (result !== actual) {
        console.log(chalk.red('FAIL', result, actual))
        throw new Error('预期值和实际值不相等')
      }
      console.log(chalk.green('PASS', result, actual))
    },
    toEqual(actual) {
      if (result !== actual) {
        throw new Error('')
      }
    },
  }
}

module.exports = {
  describe,
  it,
  expect,
}
