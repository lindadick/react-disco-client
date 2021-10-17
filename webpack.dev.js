const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        // inline: true,
        static: `${__dirname}/public`,
        port: 3333,
        host: '0.0.0.0',
    },
})
