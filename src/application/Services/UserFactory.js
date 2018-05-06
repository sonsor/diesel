const { User } = require('./User');

/**
 * [UserFactory description]
 * @type {[type]}
 */
class UserFactory
{
	/**
	 * [create description]
	 * @param {any} documentManager [description]
	 */
	create(documentManager)
	{
		let obj = new User();
		obj.setDocumentManager(documentManager);
		return obj;
	}
}

export default new UserFactory();