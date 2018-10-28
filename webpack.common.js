const path = require("path");
const webpack = require("webpack");

module.exports = {
    externals: {
        discoConfig: 'discoConfig'
    },
    output: {
        path: path.resolve(__dirname + "/public/assets"),
        filename: "bundle.js",
        publicPath: "assets"
    },
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /uk|us/)
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options: {
                    "presets": [
                        ["@babel/preset-env",{
                            "modules": "commonjs"
                        }],
                        ["@babel/preset-react",{
                            "development": process.env.BABEL_ENV === "development"
                        }]
                    ],
                    "plugins": [
                        "@babel/plugin-proposal-class-properties",
                        ["transform-imports", {
                            "reactstrap": {
                                "transform": "reactstrap/lib/${member}",
                                "preventFullImport": true
                            },
                            "react-router-dom": {
                                "transform": "react-router-dom/${member}",
                                "preventFullImport": true
                            }
                        }]
                    ]
                }            
            },
            {
                test: /\.json$/,
                exclude: /(node_modules)/,
                loader: "json-loader"
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ], 
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
    }
}