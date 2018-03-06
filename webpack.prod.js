const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const config = {
    plugins: [
        new UglifyJSPlugin({ sourceMap: true }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        // 讓編譯出來的程式碼在瀏覽器跑起來較快
        new webpack.optimize.ModuleConcatenationPlugin(),
        // 可減少編譯出來的檔案大小
        new webpack.optimize.OccurrenceOrderPlugin(),
    ],
    watch: true,
    watchOptions: {
        ignored: /node_modules/
    }
}

module.exports = merge(common, config)