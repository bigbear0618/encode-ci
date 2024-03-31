class FileListPlugin {
  constructor(options = {}) {
    this.options = options
    this.filename = this.options.filename || 'fileList.md'
  }
  apply(compiler) {
    // 打包完成时机
    compiler.hooks.emit.tap('FileListPlugin', (compilation) => {
      const { filename: fileName } = this
      const { assets } = compilation
      const fileCount = Object.keys(assets).length
      let content = `# 本次打包共生成${fileCount}个文件\n\n`
      // 遍历打包生成的资源
      for (let filename in assets) {
        content += `- ${filename}\n`
      }
      // 将信息输出到 fileList.md 文件并生成该文件
      compilation.assets[fileName] = {
        source: function () {
          return content
        },
        size: function () {
          return content.length
        },
      }
    })
  }
}

exports = module.exports = FileListPlugin
