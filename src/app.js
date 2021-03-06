import Koa from 'koa'; // koa@2
import middlewaresRegister from './middlewaresRegister';
import server from './server';

const app = new Koa();

// register middlerwares
middlewaresRegister(app);

// error logger
app.on('error', (err, ctx) => {
	console.log('error occured: ', err);
});

// create serve
server(app);

export default app;
