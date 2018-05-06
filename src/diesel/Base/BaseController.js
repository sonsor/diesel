/**
 * [BaseController description]
 * @type {[type]}
 */
class BaseController
{
	constructor() {
		this.service = {};
	}

	/**
	 * [setService description]
	 * @param {iService} service [description]
	 */
	setService(service)
	{
		this.service = service;
	}

	/**
	 * [getService description]
	 * @return {iService} [description]
	 */
	getService()
	{
		return this.service;
	}
}

module.exports = { BaseController }