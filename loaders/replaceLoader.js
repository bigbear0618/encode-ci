// console.log("replace...");
// webpack loader 一定是一个函数
// loader runner 会调用此函数，然后将上一个 loader 产生的结果或者资源文件传入进去。
// 该函数不能是箭头函数，因为函数中的 this 作为上下文会被 webpack 填充，
// 并且 loader runner 中包含一些实用的方法。
// 而起始loader只有一个入参：资源文件的内容
module.exports = function (source) {
  console.log(source)
  // 从 webpack 5 开始，this.getOptions 可以获取到 loader 上下文对象。
  const { name } = this.getOptions()
  source = source.replace(/jiusi/g, name)
  return source.replace(/console\.log\(.*\)/g, "console.log('replace...')")
}
