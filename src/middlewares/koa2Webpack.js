import webpack from 'webpack';
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware';
import devConfig from '../../webpack/webpack.config.dev';

const compiler = webpack(devConfig);

export default (app) => {
	app.use(devMiddleware(compiler, {
		noinfo: false,
		quiet: false,
		laze: true,
		// watch options (only laze: false)
		watchOptions: {
			aggregateTimeout: 300,
			poll: true
		},
		// public path to bind the middleware to
		// use the same as in webpack
		publicPath: '/assets/',
		// options for formating the statistics
		stats: {
			colors: true
		}
	}));

	app.use(hotMiddleware(compiler, {
		// log: console.log,
		// path: '//__webpack_hmr',
		// heartbeat: 10 * 1000
	}));
}