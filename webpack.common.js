const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname + "/src/index.js"),
	output: {
		path: path.resolve(__dirname + "/public/assets"),
		filename: "bundle.js",
		publicPath: "assets"
	},
	resolve: {
		alias: {
		   '../../theme.config$': path.join(__dirname, 'disco-theme/theme.config')  
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["latest", "stage-0", "react"]
					}
				}
			},
			{
				test: /\.json$/,
				exclude: /(node_modules)/,
				loader: "json-loader"
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader!autoprefixer-loader'
			},
			{
				test: /\.scss$/,
				loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
			},
			{
				use: ExtractTextPlugin.extract({
				use: ['css-loader', 'less-loader']
				}),
				test: /\.less$/
			},
			{
				test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$/,
				use: 'file-loader?name=[name].[ext]?[hash]'
			},
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url-loader?limit=10000&mimetype=application/font-woff'
			},
			{
				test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'file-loader'
			},
			{
			  test: /\.otf(\?.*)?$/,
			  use: 'file-loader?name=/fonts/[name].  [ext]&mimetype=application/font-otf'
			  }		
		]
	},
	plugins: [
		new ExtractTextPlugin({
		  filename: '[name].[contenthash].css',
		})
	 ]
}







