const webpack = require('webpack')
const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const APP_DIR = path.resolve(__dirname, 'src')
const BUILD_DIR = path.resolve(__dirname, 'build')

const config = {
	entry: {
		app: APP_DIR + '/app.tsx'
	},
	output: {
		path: BUILD_DIR,
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /\.(j|t)sx?$/,
				exclude: /node_modules/,
				use: 'ts-loader'
			}
		]
	},
	plugins: [
		new ForkTsCheckerWebpackPlugin(),
		new webpack.ProvidePlugin({ Promise: 'core-js/fn/promise' }),
	],
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx']
	},
	devtool: 'source-map'
}

module.exports = config
