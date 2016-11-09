export default async (ctx, next) => {
  const title = '登录';
  let user = ctx.session.user;
	if (user) {
    ctx.redirect('/');
	} else {
    console.log('没有登录, 重定向到登陆页面');
		return await ctx.render('login', { title });
	}
} 