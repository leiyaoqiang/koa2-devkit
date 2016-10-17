'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _fs = require('fs');var _fs2 = _interopRequireDefault(_fs);
var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);
var _debug = require('debug');var _debug2 = _interopRequireDefault(_debug);
var _default = require('./default');var _default2 = _interopRequireDefault(_default);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var debug = (0, _debug2.default)('config');
var cfgs = [];

_fs2.default.readdirSync(__dirname).map(function (filename) {
	if (['index.js', 'default.js'].indexOf(filename) > -1 || filename[0] === '.') {
		return false;
	}
	try {
		var cfg = require('./' + filename);
		if ((0, _lodash.isPlainObject)(cfg)) {
			cfgs.push(cfg);
		}
	} catch (e) {}
});

cfgs.push(_default2.default);

var config = _lodash.defaultsDeep.apply(_lodash2.default, cfgs); // ES6: defaultDeep({}, ...cfgs)

debug(config);exports.default =

config;module.exports = exports['default'];
//# sourceMappingURL=index.js.map