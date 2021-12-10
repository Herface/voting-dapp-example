const path = require('path')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {

  devServer: {
    compress: true,
  },

    configureWebpack: {
      plugins: [
        // new HtmlWebpackExternalsPlugin({
        //   // 提取公共资源
        //   externals: [
        //     {
        //       module: 'vue',
        //       entry: 'https://cdn.bootcdn.net/ajax/libs/vue/2.6.14/vue.min.js',
        //       global: "Vue"

        //     },
        //     {
        //       module: 'web3',
        //       entry: 'https://cdn.bootcdn.net/ajax/libs/web3/1.5.1-rc.0/web3.min.js',
        //     },
        //     {
        //       module: 'ant-design-vue',
        //       entry: "https://cdn.bootcdn.net/ajax/libs/ant-design-vue/2.2.2/antd-with-locales.min.js"
        //     },
        //     {
        //       module: 'ant-design-vue/dist/antd.css',
        //       entry: "https://cdn.bootcdn.net/ajax/libs/ant-design-vue/2.2.2/antd.css"
        //     },
        //   ],
        //   files: ['index.html']
        // })
      ],
        optimization: {
            runtimeChunk: "single",
            minimize: true,
            splitChunks: {
                chunks: 'all',
                maxSize: 1024 * 1024,
                minSize: 1024 * 512,
                cacheGroups: {
                  libs: {
                    name: 'chunk-libs',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: 'all' // only package third parties that are initially dependent
                  },
                  antDesignVue: {
                    name: 'chunk-ant-design-vue', // split elementUI into a single package
                    priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                    test: /[\\/]node_modules[\\/]_?ant-design-vue(.*)/ // in order to adapt to cnpm
                  },
                  commons: {
                    name: 'chunk-commons',
                    test: resolve('src/components'), // can customize your rules
                    minChunks: 3, //  minimum common number
                    priority: 5,
                    reuseExistingChunk: true
                  },
                  contracts: {
                    name: 'chunk-contracts',
                    test: /[\\/]contract[\\/].*\.json/, // can customize your rules
                    minChunks: 2, //  minimum common number
                    priority: 5,
                  }
                }
            }
          },
    }

}