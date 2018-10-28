const merge = require('webpack-merge');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        //        new BundleAnalyzerPlugin(),
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                extractComments: 'all',
                sourceMap: true // set to true if you want JS source maps
            }),
        ]
    },
});