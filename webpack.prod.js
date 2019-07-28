const merge = require('webpack-merge')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const TerserPlugin = require('terser-webpack-plugin')

const common = require('./webpack.common.js')

module.exports = merge(common, {
    mode: 'production',
    //    plugins: [new BundleAnalyzerPlugin()],
    optimization: {
        minimizer: [new TerserPlugin()],
    },
})
