import http from 'http';
import path from 'path';
import Koa from 'koa'; // koa@2
// a request body parser for koa, base on co-body, support json, from and text type body.
// koa-bodyparser@3 support koa@2
import bodyParser from 'koa-bodyparser'; 
import views from 'koa-views'; // master
import favicon from 'koa-favicon'; // @2
import serveStatic from 'koa-static'; // master
import logger from 'koa-logger'; // @2

import convert from 'koa-convert';
// need convert
// pretty-printed JSON response middleware
import json from 'koa-json';
import error from 'koa-error';

import router from './routes';
import config from './config';

const app = new Koa();

// middleware
app.use(logger());
app.use(bodyParser());
app.use(convert(json()));

// static
app.use(serveStatic(path.join(__dirname, '../public')));

// view
app.use(views(path.join(__dirname, '../views'), {
	map: {
		html: 'nunjucks'
	},
	extension: 'html'
}));

// favicon
app.use(favicon(path.join(__dirname, '../public/favicon.ico')));

// 500 error
app.use(convert(error({
	engine: 'nunjucks',
	template: path.join(__dirname, '../views/500.html')
})));

// logger
app.use(async (ctx, next) => {
	const start = new Date();
	await next();
	const ms = new Date() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// response router
// app.use(router.routes());
app.use(async (ctx, next) => {
	await require('./routes').routes()(ctx, next);
});

// 404
app.use(async (ctx) => {
	ctx.status = 404;
	await ctx.render('404');
});

// error logger
app.on('error', (err, ctx) => {
	console.log('error occured: ', err);
});


// create server
const port = parseInt(app.env.NODE_PORT || config.port || '1991');
const server = http.createServer(app.callback());

server.listen(port);
server.on('error', (error) => {
	if (error.syscall !== 'listen') {
		throw error;
	}
	// handler specific listen errors with friendly message
	switch (error.code) {
		case 'EACCES':
			console.log(port + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.log(port + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
});
server.on('listening', () => {
	console.log('Listining on port: %d', port);
});

export default app;
