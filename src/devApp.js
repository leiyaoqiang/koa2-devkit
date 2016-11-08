import Koa from 'koa'; // koa@2
import webpack from 'webpack';
import {webpackDevMiddleware, webpackHotMiddleware} from './middlewares';
import middlewaresRegister from './middlewaresRegister';
import server from './server';
import devConfig from '../webpack/webpack.config.dev';

const compiler = webpack(devConfig);

const app = new Koa();

const devMiddlewareInstance = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: devConfig.output.publicPath
});

const hotMiddlewareInstance = webpackHotMiddleware(compiler);

// register middlewares
app.use(devMiddlewareInstance);
app.use(hotMiddlewareInstance);
middlewaresRegister(app);

// error logger
app.on('error', (err, ctx) => {
	console.log('error occured: ', err);
});

server(app);


export default app;