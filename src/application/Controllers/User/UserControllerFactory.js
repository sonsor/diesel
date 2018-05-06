const { UserController } = require('./UserController');

/**
 * [UserControllerFactory description]
 * @type {[type]}
 */
class UserControllerFactory
{
	/**
	 * [create description]
	 * @param  {any}            serviceLocator [description]
	 * @return {UserController}                [description]
	 */
	static create(serviceLocator)
	{
		let obj = new UserController();
		obj.setService(serviceLocator.get('User'));
		return obj;
	}
}

module.exports = UserControllerFactory;