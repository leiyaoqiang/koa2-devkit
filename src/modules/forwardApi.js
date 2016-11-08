import 'isomorphic-fetch'
import { apiServer } from '../config'

const API_SERVER_URL = apiServer.url;

export default async function (body = {}, url = API_SERVER_URL) {
	const defOpts = {
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
		method: 'POST'
	};

	return await fetch(url, Object.assign({}, defOpts, { body }))
		.then(response => {
			if (!response.ok) {
				if (response.stateCode !== 200) {
					console.log('response.stateCode was not 200.');
					return Promise.reject({
						resultCode: -2,
						resultMsg: '后台服务器内部错误！stateCode was not 200.'
					});
				}

				console.log('Network response was not ok.');
				return Promise.reject({
					resultCode: -1,
					resultMsg: '后台服务器内部错误！Network response was not ok.'
				});
			}

			return response;
		})
		.catch(error => {
			console.log('There has been a problem with your fetch operation: ' + error.message);
			return Promise.reject({
				resultCode: -1,
				resultMsg: error.message
			});
		});
}