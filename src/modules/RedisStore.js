import Redis from 'ioredis'
import { Store } from 'koa-session2'
import { redisServer } from '../config'

export default class RedisStore extends Store {
	constructor () {
		super();
		this.redis = new Redis(
			Object.assign({}, {
				host: '127.0.0.1',
				port: 6379,
				password: '123456'
			},
			redisServer)
		);
	}

	async get(sid) {
		let data = await this.redis.get(`SESSION:${sid}`);
		return JSON.parse(data);
	}

	async set(session, opts) {
		if (!opts.sid) {
			opts.sid = this.getID(24)
		}
		await this.redis.set(`SESSION:${opts.sid}`, JSON.stringify(session));
		return opts.sid;
	}

	async destroy(sid) {
		return await this.redis.del(`SESSION:${sid}`);
	}
}