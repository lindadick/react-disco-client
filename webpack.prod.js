const webpack = require("webpack");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const CompressionPlugin = require("compression-webpack-plugin");

module.exports = merge(common, {
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"production"'
        }),
		new webpack.optimize.UglifyJsPlugin({
			mangle: true,
			compress: {
				warnings: false, // Suppress uglification warnings
				pure_getters: true,
				unsafe: true,
				unsafe_comps: true,
				screw_ie8: true
			},
			output: {
				comments: false,
			},
			exclude: [/\.min\.js$/gi] // skip pre-minified libs
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