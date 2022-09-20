const { defineConfig } = require('@vue/cli-service')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const IS_PROD = process.env.NODE_ENV === 'production'
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    if (IS_PROD) {
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
  }
})
