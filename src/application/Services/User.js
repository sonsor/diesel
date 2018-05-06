const { BaseService } = require('diesel/base');

/**
 * [BaseService description]
 * @type {[type]}
 */
class User extends BaseService
{
	/**
	 * [get description]
	 * @return {Promise<Typegoose>} [description]
	 */
	async get()
	{
		let obj = this.getDocumentManager().getRepository('User');
		let users = await obj.find({}).exec();
		return users;
	}

	/**
	 * [insert description]
	 * @return {Promise<Typegoose>} [description]
	 */
	async insert()
	{
		let newUser = new this.getDocumentManager().getRepository('User')({
              email: "wasif0332@g.com",
              name: "wasif farooq",
              password: "Admin123!!",
              username: "wasif0332"
          });
          return await newUser.save();
	}
}

module.exports = { User };