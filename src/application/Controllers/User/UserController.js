const { BaseController } = require('diesel/base');

/**
 * [BaseController description]
 * @type {[type]}
 */
class UserController extends BaseController
{
	/**
	 * [index description]
	 * @param  {Request}    req  [description]
	 * @param  {Response}   res  [description]
	 * @param  {Function}   next [description]
	 * @return {Promise<T>}      [description]
	 */
	async index(req, res, next)
	{
		let data = await this.getService().get();
		res.json(data);
	}

	/**
	 * [auth description]
	 * @param {Request}  req  [description]
	 * @param {Response} res  [description]
	 * @param {Function} next [description]
	 */
	auth(req, res, next)
	{
		console.log('user authentication');
		next();
	}
};

module.exports = { UserController };