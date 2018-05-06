const { IndexController } = require('./IndexController');


/**
 * [IndexControllerFactory description]
 * @type {[type]}
 */
class IndexControllerFactory
{
	/**
	 * [create description]
	 * @return {IndexController} [description]
	 */
	static create(serviceLocator)
	{
		let obj = new IndexController();
		return obj;
	}
}

module.exports = IndexControllerFactory