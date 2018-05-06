/**
 * [iService description]
 * @type {[type]}
 */
class BaseService
{
	constructor() {
		this._dm = {};
	}

	/**
	 * [setDocumentManager description]
	 * @param {iDocumentManager} dm [description]
	 */
	setDocumentManager(dm)
	{
		this._dm = dm;
	}

	/**
	 * [getDocumentManager description]
	 * @return {iDocumentManager} [description]
	 */
	getDocumentManager()
	{
		return this._dm;
	}

	/**
	 * [find description]
	 * @param  {iObject         = {}}        filters [description]
	 * @param  {iObject         = {}}        fields  [description]
	 * @param  {iObject         = {}}        sort    [description]
	 * @param  {number          = 0}           limit   [description]
	 * @param  {number          = 0}           skip    [description]
	 * @return {Promise<Typegoose>}   [description]
	 */
	async find(filters = {}, fields = {}, sort = {}, limit = 0, skip = 0)
	{
		let query = this.getDocumentManager().find(filters);

		if (Object.keys(fields).length > 0) {
			query.select(fields);
		}

		if (Object.keys(sort).length > 0) {
			query.sort(sort);
		}

		if (limit > 0) {
			query.limit(limit);
		}

		if (skip > 0) {
			query.skip(skip);
		}

		return await query.exec();
	}

	/**
	 * [edit description]
	 * @param {iObject} data [description]
	 */
	edit(data = {})
	{

	}

}

module.exports = { BaseService };