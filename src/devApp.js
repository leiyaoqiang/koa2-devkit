import Koa from 'koa'; // koa@2
import webpack from 'webpack';
import {webpackDevMiddleware, webpackHotMiddleware} from './middlewares';
import middlewaresRegister from './middlewaresRegister';
import server from './server';
import devConfig from '../webpack/webpack.config.dev';

const compiler = webpack(devConfig);

const app = new Koa();

const devMiddlewareInstance = webpackDevMiddleware(compiler, {
    // publicPath is required, whereas all other options are optional
    noInfo: false,
    // display no info to console (only warnings and errors)
    quiet: false,
    // display nothing to the console
    lazy: true,
    // switch into lazy mode
    // that means no watching, but recompilation on every request
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },
    // watch options (only lazy: false)
    publicPath: devConfig.output.publicPath,
    // public path to bind the middleware to
    // use the same as in webpack
    stats: {
        colors: true
    }
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