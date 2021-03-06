import Router from 'koa-router';
import indexCtrl from '../controllers/indexCtrl';
import loginCtrl from '../controllers/loginCtrl';

const router = new Router();

router.get('/login', loginCtrl);
router.get('*', indexCtrl);

export default async function (ctx, next) {
	return await router.routes()(ctx, next);
};