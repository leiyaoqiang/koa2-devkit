import Router from 'koa-router';
import indexCtrl from '../controllers/indexCtrl';

const router = new Router();

router.get('/', indexCtrl);

export default async function (ctx, next) {
	return await router.routes()(ctx, next);
};