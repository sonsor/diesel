const { loader } = require('./loader');

/**
 * [iDocumentManager description]
 * @type {[type]}
 */
class DocumentManager
{
	/**
	 * [constructor description]
	 * @param {Loader} loader [description]
	 */
	constructor(loader)
	{
		this.loader = loader;
	}

	/**
	 * [getRepository description]
	 * @param  {string}    name [description]
	 * @return {iDocument}      [description]
	 */
	getRepository(name)
	{
		try {
			let document = this.loader.getDocument(name);
			return document;
		} catch (e) {
			console.log(e);
		}
	}
}

module.exports = { documentManager:  new DocumentManager(loader)};