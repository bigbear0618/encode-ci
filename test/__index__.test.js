const { expect, it, describe } = require('./test')
function sum(a, b) {
  return a + b
}

describe('测试内容', () => {
  it('测试sum函数', () => {
    expect(sum(1, 11)).toBe(2)
  })
})
