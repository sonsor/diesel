let routes = [{
	path: '/',
	method: 'get',
	controller: 'Index',
	action: 'index',
	middlewares: [
	],
	children: [{
		path: '/get',
		method: 'get',
		controller: 'User\\User',
		action: 'index',
		children: [],
		middlewares: [
			'Auth',
			'User\\User::auth'
		],
	}, {
		path: '/me',
		method: 'get',
		controller: 'Index',
		action: 'index',
		children: []
	}]
}];

module.exports = routes;