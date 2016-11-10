var path = require('path');
var webpack = require('webpack');

module.exports = {
	devTool: 'cheap-module-eval-source-map',
	entry: [
		'webpack-hot-middleware/client?reload=1',
		'./client/index.js'
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, '../public/build'),
		publicPath: '/build/'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				enclude: /node_modules/,
				loader: 'babel',
				query: {
					'presets': ['react']
				}
			},{
				test: /\.less$/,
				loader: 'style!css!less'
			},{
				test: /\.(png|jpg)$/,
				loader: 'url?limit=50000'
			}
		]
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	]
}