const merge = require('webpack-merge')
const common = require('./webpack.common.js')

const config = {
    mode: 'production',
    watch: true,
    watchOptions: {
        ignored: /node_modules/
    }
}

module.exports = merge(common, config)