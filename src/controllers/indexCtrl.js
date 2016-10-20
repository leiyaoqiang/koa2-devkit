export default async (ctx, next) => {
	const title = 'Koa2 Title';
	return await ctx.render('index', {
		title
	});
}