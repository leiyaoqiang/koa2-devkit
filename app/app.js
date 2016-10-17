'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _http = require('http');var _http2 = _interopRequireDefault(_http);
var _path = require('path');var _path2 = _interopRequireDefault(_path);
var _koa = require('koa');var _koa2 = _interopRequireDefault(_koa);


var _koaBodyparser = require('koa-bodyparser');var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);
var _koaViews = require('koa-views');var _koaViews2 = _interopRequireDefault(_koaViews);
var _koaFavicon = require('koa-favicon');var _koaFavicon2 = _interopRequireDefault(_koaFavicon);
var _koaStatic = require('koa-static');var _koaStatic2 = _interopRequireDefault(_koaStatic);
var _koaLogger = require('koa-logger');var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _koaConvert = require('koa-convert');var _koaConvert2 = _interopRequireDefault(_koaConvert);


var _koaJson = require('koa-json');var _koaJson2 = _interopRequireDefault(_koaJson);
var _koaError = require('koa-error');var _koaError2 = _interopRequireDefault(_koaError);

var _routes = require('./routes');var _routes2 = _interopRequireDefault(_routes);
var _config = require('./config');var _config2 = _interopRequireDefault(_config);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // need convert
// pretty-printed JSON response middleware
// master
// master
// koa@2
// a request body parser for koa, base on co-body, support json, from and text type body.
// koa-bodyparser@3 support koa@2
var app = new _koa2.default(); // middleware
// @2
// @2
app.use((0, _koaLogger2.default)());app.use((0, _koaBodyparser2.default)());app.use((0, _koaConvert2.default)((0, _koaJson2.default)())); // static
app.use((0, _koaStatic2.default)(_path2.default.join(__dirname, '../public')));
// view
app.use((0, _koaViews2.default)(_path2.default.join(__dirname, '../views'), {
	map: {
		html: 'nunjucks' },

	extension: 'html' }));


// favicon
app.use((0, _koaFavicon2.default)(_path2.default.join(__dirname, '../public/favicon.ico')));

// 500 error
app.use((0, _koaConvert2.default)((0, _koaError2.default)({
	engine: 'nunjucks',
	template: _path2.default.join(__dirname, '../views/500.html') })));


// logger
app.use(function () {var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {var start, ms;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
						start = new Date();_context.next = 3;return (
							next());case 3:
						ms = new Date() - start;
						console.log(ctx.method + ' ' + ctx.url + ' - ' + ms + 'ms');case 5:case 'end':return _context.stop();}}}, _callee, undefined);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}());


// response router
// app.use(router.routes());
app.use(function () {var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
							require('./routes').routes()(ctx, next));case 2:case 'end':return _context2.stop();}}}, _callee2, undefined);}));return function (_x3, _x4) {return _ref2.apply(this, arguments);};}());


// 404
app.use(function () {var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx) {return _regenerator2.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
						ctx.status = 404;_context3.next = 3;return (
							ctx.render('404'));case 3:case 'end':return _context3.stop();}}}, _callee3, undefined);}));return function (_x5) {return _ref3.apply(this, arguments);};}());


// error logger
app.on('error', function (err, ctx) {
	console.log('error occured: ', err);
});


// create server
var port = parseInt(app.env.NODE_PORT || _config2.default.port || '1991');
var server = _http2.default.createServer(app.callback());

server.listen(port);
server.on('error', function (error) {
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
			throw error;}

});
server.on('listening', function () {
	console.log('Listining on port: %d', port);
});exports.default =

app;module.exports = exports['default'];
//# sourceMappingURL=app.js.map