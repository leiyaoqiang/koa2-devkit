export default async (ctx, next) => {
	const title = 'Koa2 Title';
	await ctx.render('index', {
		title
	});
}