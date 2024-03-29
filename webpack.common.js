const path = require('path')
const webpack = require('webpack')

module.exports = {
    externals: {
        discoConfig: 'discoConfig',
    },
    entry: {
        app: './src/index.jsx',
        widget: './src/widget.jsx',
    },
    output: {
        path: path.resolve(`${__dirname}/public/assets`),
        filename: '[name].bundle.js',
        publicPath: 'assets',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /uk|us/)],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                modules: 'commonjs',
                            },
                        ],
                        [
                            '@babel/preset-react',
                            {
                                development: process.env.BABEL_ENV === 'development',
                            },
                        ],
                    ],
                    plugins: [
                        '@babel/plugin-proposal-class-properties',
                        [
                            'transform-imports',
                            {
                                reactstrap: {
                                    // eslint-disable-next-line no-template-curly-in-string
                                    transform: 'reactstrap/lib/${member}',
                                    preventFullImport: true,
                                },
                                'react-router-dom': {
                                    // eslint-disable-next-line no-template-curly-in-string
                                    transform: 'react-router-dom/${member}',
                                    preventFullImport: true,
                                },
                            },
                        ],
                    ],
                },
            },
            {
                test: /\.json$/,
                exclude: /(node_modules)/,
                loader: 'json-loader',
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '/fonts/[name].[ext]?[hash]',
                            mimetype: 'application/font-otf'
                        }
                    }
                ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'application/font-woff'
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader',
            },
            {
                test: /\.otf(\?.*)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '/fonts/[name].[ext]',
                            mimetype: 'application/font-otf'
                        }
                    }
                ]
            },
        ],
    },
}
