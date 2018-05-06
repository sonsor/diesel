const mongoose = require('mongoose');
const { ENV } = require('diesel');

let instance = {};

/**
 * [Database description]
 * @type {[type]}
 */
class Database
{
	/**
	 * [constructor description]
	 * @param {string} uri [description]
	 */
	constructor(uri)
	{

		this.uri = uri;		

		mongoose.connect(this.uri, function() {
			console.log('[*] Connected to database');
			Database.instance = mongoose;
		}, function(err) {
			throw err;
		});;
	}

	static get instance()
	{
		return instance;
	}

	static set instance(instance)
	{
		instance = instance;
	}

	/**
	 * [getInstance description]
	 * @return {any} [description]
	 */
	static getInstance()
	{
		if (this.instance && this.instance.readyState) {
			return this.instance;
		}

		new Database(ENV.DB_URL);
		return mongoose;
	}
}

module.exports = Database;