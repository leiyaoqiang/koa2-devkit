export default async (ctx, next) => {
  const title = '登录';
  let user = ctx.session.user;
	if (user) {
    ctx.redirect('/');
	} else {
		return await ctx.render('login', { title });
	}
} 