const path = require("path");

module.exports = {
    externals: {
        discoConfig: 'discoConfig'
    },
    output: {
        path: path.resolve(__dirname + "/public/assets"),
        filename: "bundle.js",
        publicPath: "assets"
    },
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
                        "@babel/plugin-proposal-class-properties"
                    ]
                }            
            },
            {
                test: /\.json$/,
                exclude: /(node_modules)/,
                loader: "json-loader"
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
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