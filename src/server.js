import http from 'http';
import config from './config';

export default (app) => {
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
}