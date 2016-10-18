'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _koa = require('koa');var _koa2 = _interopRequireDefault(_koa);
var _middlewaresRegister = require('./middlewaresRegister');var _middlewaresRegister2 = _interopRequireDefault(_middlewaresRegister);
var _server = require('./server');var _server2 = _interopRequireDefault(_server);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // koa@2

var app = new _koa2.default();

// register middlerwares
(0, _middlewaresRegister2.default)(app);

// error logger
app.on('error', function (err, ctx) {
	console.log('error occured: ', err);
});

// create serve
(0, _server2.default)(app);exports.default =

app;module.exports = exports['default'];
//# sourceMappingURL=app.js.map