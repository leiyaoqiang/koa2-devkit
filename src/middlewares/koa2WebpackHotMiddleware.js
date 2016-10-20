import hotMiddleware from 'webpack-hot-middleware'

function applyMiddleware (middleware, req, res) {
	const _end = res.end;
	return new Promise((resolve, reject) => {
		try {
			res.end = function () { _end.apply(res, arguments) && resolve(false) };
			middleware(req, res, resolve.bind(null, arguments));
		} catch (error) {
			reject(error);
		}
	});
}

export default (compiler, options) => {
	const middleware = hotMiddleware(compiler, options);
	return async (context, next) => {
		const haoNext = applyMiddleware(middleware, context.req, context.res);
		haoNext && await next();
	}
}