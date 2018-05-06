const { BaseController } = require('diesel/base');
/**
 * [IndexController description]
 * @type {[type]}
 */
class IndexController extends BaseController
{
	/**
	 * [index description]
	 * @param {Request}  req  [description]
	 * @param {Response} res  [description]
	 * @param {Function} next [description]
	 */
	index(req, res, next)
	{
		res.json({action: 'index action for index'});
	}
};

module.exports = { IndexController };