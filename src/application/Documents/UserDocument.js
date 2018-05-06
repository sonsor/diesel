const { BaseDocument } = require('diesel/base');

/**
 * [User description]
 * @type {[type]}
 */
class User extends BaseDocument
{
}
 
const UserDocument = new User().getModel(User);
export default UserDocument;

