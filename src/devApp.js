import Koa from 'koa'; // koa@2
import middlewaresRegister from './middlewaresRegister';
import koa2Webpack from './middlewares/koa2Webpack';
import server from './server';

const app = new Koa();

// register middlewares
koa2Webpack(app);
middlewaresRegister(app);

// error logger
app.on('error', (err, ctx) => {
	console.log('error occured: ', err);
});

// create serve
server(app);

export default app;