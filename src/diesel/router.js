const express = require('express');
const path = require('path');
const { loader } = require('./loader');
const { serviceLocator } = require('./service-locator');

let instance = {};

/**
 * [Router description]
 * @type {[type]}
 */
class Router
{
	/**
	 * [constructor description]
	 * @param {Router}          router         [description]
	 * @param {iServiceLocator} ServiceLocator [description]
	 * @param {iLoader}         Loader         [description]
	 */
	constructor(router, serviceLocator, Loader)
	{
		this.routes = [];
		this.router = {};
		this.loader = {};
		this.serviceLocator = {};

		/*if (Router.instance) {
			return Router.instance;
		}*/
		this.routes = loader.getRoutes();
		this.router = router;
		this.serviceLocator = serviceLocator;
		//Router.instance = this;

		this.loader = Loader;
		this.setup(this.routes);
	}

	static get instance() {
		return instance;
	}

	static set instance(instance) {
		instance = instance;
	}

	/**
	 * [setup description]
	 * @param {Array<iRoute>} routes [description]
	 * @param {string     =      ''}          parent [description]
	 */
	setup(routes = [], parent = '')
	{
		let self = this;
		routes.forEach(function(route) {

			//this.loader.getController.bind(this.loader);
			let obj = self.loader.getController(route.controller).create(self.serviceLocator);
			let middlwares = self.middlewares(route);

			if (parent !== '') {
				route.path = (parent !== '/') ? parent + route.path: route.path;
			}

			let action = obj[route.action].bind(obj);
			self.addRoute(route.path, route.method, action, middlwares);

			if (route.children && route.children.length > 0) {
				self.setup(route.children, route.path);
			}

		});
	}

	/**
	 * [addRoute description]
	 * @param {string}        path       [description]
	 * @param {string}        method     [description]
	 * @param {string}        action     [description]
	 * @param {Array<string>} middlwares [description]
	 */
	addRoute(path, method, action, middlwares)
	{
		let func;
		switch (action) {
			case 'post':
				func = this.router.post.bind(this.router);
			break;
			case 'put':
				func = this.router.put.bind(this.router);
			break;
			default:
				func = this.router.get.bind(this.router);
		}

		let params = [path];

		if (middlwares.length > 0) {
			params.push(middlwares);
		}

		params.push(action);
		func.apply(func, params);
	}

	/**
	 * [middlewares description]
	 * @param  {iRoute}          route [description]
	 * @return {Array<Function>}       [description]
	 */
	middlewares(route)
	{
		let self = this;
		let callbacks = [];
		if (!('middlewares' in route)) {
			return callbacks;
		}

		if (!(route.middlewares instanceof Array)) {
			route.middlewares = [route.middlewares];
		}

		route.middlewares.forEach(function(middleware) {

			let func = false;

			if (middleware.indexOf('::') > 0) {

				let parts = middleware.split('::');
				let controller = parts[0];
				let action = parts[1];

				let obj = self.loader.getController(controller).create(self.serviceLocator);;
				func = obj[action].bind(obj);

			} else {

				func = self.loader.getMiddleware(middleware);

			}

			if (func !== false) {
				callbacks.push(func);
			}
		});
		return callbacks;
	}

	/**
	 * [getInstance description]
	 * @return {Router} [description]
	 */
	getInstance()
	{
		return this.router;
	}
}

module.exports = { router: new Router(express.Router(), serviceLocator, loader) };