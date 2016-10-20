import devMiddleware from 'webpack-dev-middleware';

function applyMiddleware (middleware, req, res) {
	const _send = res.send;
	return new Promise ((resolve, reject) => {
		try {
			res.send = function () { _send.apply(res, arguments) && resolve(false) };
			middleware(req, res, resolve.bind(null, true));
		} catch (error) {
			reject(error);
		}
	})
}

export default (compiler, options = {}) => {
	const { publicPath } = compiler.options.output;
	const defaultOpts = options.publicPath ? options : { publicPath };
	// the middleware for express to use.
	// expressApp.use(function (req, res, next) {...})
	const middleware = devMiddleware(compiler, Object.assign({}, defaultOpts, options));

	// koa2 middleware need to return a async function or a Promise function
	return async (context, next) => {
		const hasNext = await applyMiddleware(middleware, context.req, {
			send: content => context.body = content,
			setHeader: function () { context.set.apply(context, arguments) }
		});

		hasNext && await next();
	}
}