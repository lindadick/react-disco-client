const webpack = require("webpack");
const path = require("path");

module.exports = {
    entry: path.resolve(__dirname + "/src/index.js"),
    output: {
        path: path.resolve(__dirname + "/public/assets"),
        filename: "bundle.js",
        publicPath: "assets"
    },
    module: {
        rules: [{
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
            // this rule handles images
            {
                test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$/,
                use: 'file-loader?name=[name].[ext]?[hash]'
            },
            // the following 3 rules handle font extraction
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
    }
}