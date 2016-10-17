import fs from 'fs';
import lodash, { isPlainObject, defaultsDeep } from 'lodash';
import Debug from 'debug';
import defaultConfig from './default';

const debug = Debug('config');
const cfgs = [];

fs.readdirSync(__dirname).map(filename => {
	if (['index.js', 'default.js'].indexOf(filename) > -1 || filename[0] === '.') {
		return false;
	}
	try {
		const cfg = require('./' + filename);
		if (isPlainObject(cfg)) {
			cfgs.push(cfg);
		}
	} catch (e) {}
});

cfgs.push(defaultConfig);

const config = defaultsDeep.apply(lodash, cfgs); // ES6: defaultDeep({}, ...cfgs)

debug(config);

export default config;