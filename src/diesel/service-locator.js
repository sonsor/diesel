const { loader } = require('./loader');
const { documentManager } = require('./document-manager');

/**
 * [ServiceLocator description]
 * @type {[type]}
 */
class ServiceLocator
{

	/**
	 * [constructor description]
	 * @param {any} loader          [description]
	 * @param {any} documentManager [description]
	 */
	constructor(loader, documentManager)
	{
		this.loader = loader;
		this.documentManager = documentManager;
	}

	/**
	 * [get description]
	 * @param  {string} name [description]
	 * @return {any}         [description]
	 */
	get(name)
	{
		try {
			let obj = this.loader.getService(name).create(this.documentManager);
			return obj;
		} catch (e) {
			console.log(e.getMessage);
		}
	}
}

module.exports = {serviceLocator: new ServiceLocator(loader, documentManager)};