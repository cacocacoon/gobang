const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

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
