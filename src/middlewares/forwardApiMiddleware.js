import { forwardApi } from '../modules'

export default () => {
	return async (ctx, next) => {
		const filerRegExp = /^\/api\/apiServer/;
		
		// 过滤 ‘/api/apiServer’ 路径的 POST 请求
		// 转发接口
		if (ctx.method === 'POST' && filerRegExp.test(ctx.path)) {
			return await forwardApi(ctx.body);
		}

		await next();
	}
}