var webpack = require("webpack");
var path = require("path");

module.exports = {
	entry: path.resolve(__dirname + "/src/index.js"),
	output: {
		path: path.resolve(__dirname + "/public/assets"),
		filename: "bundle.js",
		publicPath: "assets"
	},
	devtool: 'inline-source-map',
	devServer: {
		inline: true,
		contentBase: __dirname + '/public',
		port: 3333,
		host: '0.0.0.0'
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
			}
		]
	}
}







