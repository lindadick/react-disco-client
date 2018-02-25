const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	devtool: 'cheap-module-source-map',
	devServer: {
		inline: true,
		contentBase: __dirname + '/public',
		port: 3333,
		host: '0.0.0.0'
	},
});







