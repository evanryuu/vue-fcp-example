/* eslint-disable */
const { defineConfig } = require('@vue/cli-service')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const IS_PROD = process.env.NODE_ENV === 'production'
let externals = {}
if (IS_PROD) {
  externals = {
    'vue': 'Vue', // CDN 的 Element 依赖全局变量 Vue， 所以 Vue 也需要使用 CDN 引入
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
    'element-ui': 'ELEMENT', // 不去 node_modules 中找，而是去找 全局变量 ELEMENT
    'axios': 'axios'
  }
}
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
      // 移除prefetch插件，避免加载多余的资源
      config.plugins.delete('prefetch');
      // 移除 preload 插件，避免加载多余的资源
      config.plugins.delete('preload');
    }
    // config.externals(externals)
  }
})
