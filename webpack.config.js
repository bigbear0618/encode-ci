const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const FileListPlugin = require('./plugin/filePlugin')

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'thread-loader',
            // 有同样配置的 loader 会共享一个 worker 池
            options: {
              // 产生的 worker 的数量，默认是 (cpu 核心数 - 1)，或者，
              // 在 require('os').cpus() 是 undefined 时回退至 1
              workers: require('os').cpus(),

              // 一个 worker 进程中并行执行工作的数量
              // 默认为 20
              workerParallelJobs: 50,

              // 额外的 node.js 参数
              workerNodeArgs: ['--max-old-space-size=4096'],

              // 允许重新生成一个僵死的 work 池
              // 这个过程会降低整体编译速度
              // 并且开发环境应该设置为 false
              poolRespawn: false,

              // 闲置时定时删除 worker 进程
              // 默认为 500（ms）
              // 可以设置为无穷大，这样在监视模式(--watch)下可以保持 worker 持续存在
              poolTimeout: 2000,

              // 池分配给 worker 的工作数量
              // 默认为 200
              // 降低这个数值会降低总体的效率，但是会提升工作分布更均一
              poolParallelJobs: 50,

              // 池的名称
              // 可以修改名称来创建其余选项都一样的池
              name: 'my-pool',
            },
          },
          // 耗时的 loader（例如 babel-loader）
          // 对应 loader
          // 比如我现在想用 ts，我就可以选用 ts-loader
          // 或者是 babel-loader 或者swc-loader(对标babel-loader)
          {
            loader: path.resolve(__dirname, './loaders/replaceLoader.js'),
            options: {
              name: 'world',
            },
          },
          {
            loader: 'babel-loader',
            // options: {
            //   // presets的含义是一组plugins的集合
            //   presets: ['@babel/preset-env'],
            // },
          },
        ],
      },
    ],
  },
  plugins: [new BundleAnalyzerPlugin(), new FileListPlugin()],
  resolve: {
    // 配置ts文件可以作为模块加载
    extensions: ['.ts', '.js'],
  },
  devtool: false, // webpack source map配置
  // cache: {
  //   type: 'filesystem',
  //   // buildDependencies: {
  //   //   config: [__filename],
  //   // },
  //   allowCollectingMemory: true,
  // },
}
