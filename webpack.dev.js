const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
// 以多執行緒的方式編譯程式碼，加快編譯速度
const HappyPack = require('happypack')

const BUILD_DIR = path.resolve(__dirname, 'build')

const config = {
	devServer: {
		contentBase: BUILD_DIR,
		inline: true,
		port: 8080
	},
	plugins: [
		// new HappyPack({
		// 	id: 'tsx',
		// 	threads: 4,
		// 	loaders: [
		// 		{
		// 			loader: 'ts-loader',
		// 			options: { happyPackMode: true }
		// 		}
		// 	]
		// })
	]
}

module.exports = merge(common, config)
