const TYPES = require('./QueryTypes');

class Query
{
	constructor(collection, query, options)
	{
		switch (query['type']) {
			case TYPES.TYPE_FIND:
			case TYPES.TYPE_FIND_AND_UPDATE:
			case TYPES.TYPE_FIND_AND_REMOVE:
			case TYPES.TYPE_COUNT:
			case TYPES.TYPE_INSERT:
			case TYPES.TYPE_UPDATE:
			case TYPES.TYPE_REMOVE:
			case TYPES.TYPE_GROUP:
			case TYPES.TYPE_MAP_REDUCE:
			case TYPES.TYPE_DISTINCT:
			case TYPES.TYPE_GEO_NEAR:
				break;
			default:
				throw new Error('Invalid Query Type');
		}
		this.collection = collection;
		this.query = query;
		this.options = options;
		this.iterator = [];
	}

	/**
	 * [findOnly description]
	 * @type {[type]}
	 */
	count(findOnly = false)
	{
		this.getIterator().count(findOnly);
	}

	/**
	 * [name description]
	 * @type {[type]}
	 */
	debug(name = null)
	{
		return name !== null ? this.query[name]: this.query;
	}

	execute()
	{
		let options = this.options;

		switch (this.query['type']) {
			case TYPES.TYPE_FIND:
				let cursoe = this.collection.find(
					this.query['query'],
					typeof this.query['select'] !== 'undefined' ? this.query['selet']: []
				);

				return this.prepareCursor(cursor);
			break;
			
		}
	}


}