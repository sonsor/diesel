const TYPES = require('./Types');

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
			case TYPES.TYPE_FIND_AND_UPDATE:

				let queryOptions = this.getQueryOptions('new', 'select', 'sort', 'upsert');
				queryOptions = this.removeQueryOptions(queryOptions, ['select', 'fields']);

				let clousre = () => {
					return this.collection.findAndUpdate(
						this.query['query'],
						this.query['newObj'],
						Object.assign({}, options, queryOptions)
					);
				}

				return this.withPrimaryReadPreference(this.collection.getDatabase(), clousre);

			break;
			case TYPES.TYPE_FIND_AND_REMOVE:

				let queryOptions = this.getQueryOptions('select', 'sort');
				queryOptions = this.removeQueryOptions(queryOptions, ['select', 'fields']);

				let clousre = () => {
					return this.collection.findAndRemove(
						this.query['query'],
						this.query['newObj'],
						Object.assign({}, options, queryOptions)
					);
				}

				return this.withPrimaryReadPreference(this.collection.getDatabase(), clousre);

			break;
			case TYPES.TYPE_INSERT:
				return this.collection.insert(this.query['newObj'], options);
			break;
			case TYPES.TYPE_UPDATE:
				return this.collection.update(
					this.query['query'],
					this.query['newObj'],
					Object.assign({}, options, this.getQueryOptions('multiple', 'upsert'))
				);
			break;
			csae TYPES.TYPE_REMOVE:
				return this.collection.remove(this.query['query'], options);
			break;
			case TYPES.TYPE_GROUP:

				if (Object.keys(this.query['query']).length > 0) {
					options['cond'] = this.query['query'];
				}

				let collection = this.collection,
				let query = this.query;

				let clousre = () => {
					return collection.group(
						query['group']['keys'],
						query['group']['initial'],
						query['group']['reduce'],
						Object.assign({}, options, query['group']['options'])
					);
				};

				return this.withReadPreference(collection.getDatabase(), clousre);

			break;
			case TYPES.TYPE_MAP_REDUCE:

				if (typeof this.query['limit'] !== 'undefined') {
					options['limit'] = this.query['limit'];
				}

				let collection = this.collection,
				let query = this.query;

				let clousre = () => {
					return collection.mapReduce(
						query['mapReduce']['map'],
						query['mapReduce']['reduce'],
						query['mapReduce']['out'],
						query['query'],
						Object.assign({}, options, query['mapReduce']['options'])
					);
				};

				return this.withReadPreference(collection.getDatabase(), clousre);

			break;
			case TYPES.TYPE_DISTINCT:

				let collection = this.collection,
				let query = this.query;

				let clousre = () => {
					return collection.distinct(query['distinct'], query['query'], options);
				};

				return this.withReadPreference(collection.getDatabase(), clousre);

			break;
			case TYPES.TYPE_GEO_NEAR:

				if (typeof this.query['limit'] !== 'undefined') {
					options['limit'] = this.query['limit'];
				}

				let collection = this.collection,
				let query = this.query;

				let clousre = () => {
					return collection.near(
						query['geoNear']['near'],
						query['query'],
						Object.assign({}, options, query['geoNear']['options'])
					);
				};

				return this.withReadPreference(collection.getDatabase(), clousre);

			break;
			case TYPES.TYPE_COUNT:

				let collection = this.collection,
				let query = this.query;

				let clousre = () => {
					return collection.count(
						query['query'],
						Object.assign({}, options, this.getQueryOptions('hint', 'limit', 'maxTimeMS', 'skip'))
					);
				};

				return this.withReadPreference(collection.getDatabase(),clousre);

			break;			
		}
	}
}