export default async (ctx, next) => {
	const title = '和路由后台管理';
	let user = ctx.session.user;
	if (user) {
		return await ctx.render('index', { title });
	} else {
		ctx.redirect('/login');
	}
}