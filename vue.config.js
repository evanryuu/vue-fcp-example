const { defineConfig } = require('@vue/cli-service')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugin('webpack-bundle-analyzer')
      .use(new BundleAnalyzerPlugin(
        {
          analyzerMode: 'static', // 可选值有server static disabled
          generateStatsFile: false,
          statsOptions: { source: false },
          openAnalyzer: false
        }
      ))
  }
})
