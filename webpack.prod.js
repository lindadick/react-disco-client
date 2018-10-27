const webpack = require("webpack");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const CompressionPlugin = require("compression-webpack-plugin");

module.exports = merge(common, {
    devtool: 'source-map',
    mode: 'production',
    plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"production"'
        }),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		new CompressionPlugin({
			asset: "[path].gz[query]",
			algorithm: "gzip",
			test: /\.js$|\.css$|\.html$/,
			threshold: 10240,
			minRatio: 0
		})
	],
});