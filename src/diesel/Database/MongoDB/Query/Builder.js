const { TYPES } = require('./Types');
const { Expr } = require('./Expr');
const { Query } = require('./Query');

class Builder
{
	constructor(collection)
	{
		this.db = {};
		this.collection = collection;
		this.collection = {};
		this.query = {type: TYPES.TYPE_FIND};
		this.expr = new Expr();
	}

	addAnd()
	{
		this.expr.addAnd.call(arguments);
		return this;
	}

	addManyToSet(values)
	{
		this.expr.addManyToSet(values);
		return this;
	}

	addNor()
	{
		this.expr.addNor.call(arguments);
		return this;
	}

	addOr()
	{
		this.expr.addOr.call(arguments);
		return this;
	}

	addToSet(valueOrExpression)
	{
		this.expr.addToSet(valueOrExpression);
		return this;
	}

	all(values)
	{
		this.expr.all(values);
		return this;
	}

	bitAnd(value)
	{
		this.expr.bitAnd(value);
		return this;
	}

	bitOr(value)
	{
		this.expr.bitOr(value);
		return this;
	}

	bitsAllClear(value)
	{
		this.expr.bitsAllClear(value);
		return this;
	}

	bitsAllSet(value)
	{
		this.expr.bitsAllSet(value);
		return this;
	}

	bitsAnyClear(value)
	{
		this.expr.bitsAnyClear(value);
		return this;
	}

	bitsAnySet(value)
	{
		this.expr.bitsAnySet(value);
		return this;
	}

	bitXor(value)
	{
		this.expr.bitXor(value);
		return this;
	}

	caseSensitive(caseSensitive)
	{
		this.expr.caseSensitive(caseSensitive);
		return this;
	}

	comment(comment)
	{
		this.expr.comment(comment);
		return this;
	}

	count()
	{
		this.query['type'] = TYPES.TYPE_COUNT;
		return this;
	}

	currentDate(type = 'date')
	{
		this.expr.currentDate(type);
		return this;
	}

	debug(name = null)
	{
		return name !== null ? this.query[name]: this.query;
	}

	diacriticSensitive(diacriticSensitive)
	{
		this.expr.diacriticSensitive(diacriticSensitive);
		return this;
	}

	distanceMultiplier(distanceMultiplier)
	{
		if (this.query['type'] !== TYPES.TYPE_GEO_NEAR) {
			throw new Err();
		}

		this.query['geoNear']['options']['distanceMultiplier'] = distanceMultiplier;
		return this;
	}

	distinct(field)
	{
		this.query['type'] = TYPES.TYPE_DISTINCT;
		this.query['distinct'] = field;
		return this;
	}

	eagerCursor(eagerCursor)
	{
		this.query['eagerCursor'] = eagerCursor;
		return this;
	}

	elemMatch(expr)
	{
		this.expr.elemMatch(expr)
		return this;
	}

	equals(value)
	{
		this.expr.equals(value)
		return this;
	}

	exclude(fieldName = null)
	{
		if (typeof this.query['select'] === 'undefined') {
			this.query['select'] = [];
		}

		let fieldNames = fieldName instanceof Array ? fieldName: arguments;

		for (let i in fieldNames) {
			this.query['select'][fieldNames[i]] = 0;
		}

		return this;
	}

	exists(value)
	{
		this.expr.exists(value)
		return this;
	}

	expr()
	{
		return new Expr();
	}

	field(field)
	{
		this.expr.field(field)
		return this;
	}

	finalize(finalize)
	{
		switch (this.query['type']) {
			case TYPES.TYPE_MAP_REDUCE:
				this.query['mapReduce']['options']['finalize'] = finalize;
			break;
			case TYPES.TYPE_GROUP:
				this.query['group']['options']['finalize'] = finalize;
			break;
			default:
				throw new Err();
		}

		return this;
	}

	find()
	{
		this.query['type'] = TYPES.TYPE_FIND;
		return this;
	}

	findAndRemove()
	{
		this.query['type'] = TYPES.TYPE_FIND_AND_REMOVE;
		return this;
	}

	findAndUpdate()
	{
		this.query['type'] = TYPES.TYPE_FIND_AND_UPDATE;
		return this;
	}

	geoIntersects(geometry)
	{
		this.expr.geoIntersects(geometry);
		return this;
	}

	geoNear(x, y = null)
	{
		this.query['type'] = TYPES.TYPE_GEO_NEAR;
		this.query['geoNear'] = {
			near: x instanceof Array ? x : [x, y],
			options: {
				spherical: x instanceof Array && typeof x['type'] !== 'undefined'
			}
		};

		return this;
	}

	geoWithin(geometry)
	{
		this.expr.geoWithin(geometry);
		return this;
	}

	geoWithinBox(x1, y1, x2, y2)
	{
		this.expr.geoWithinBox(x1, y1, x2, y2);
		return this;
	}

	geoWithinCenter(x, y, radius)
	{
		this.expr.geoWithinCenter(x, y, radius);
		return this;
	}

	geoWithinCenterSphere(x, y, radius)
	{
		this.expr.geoWithinCenterSphere(x, y, radius);
		return this;
	}

	geoWithinPolygon()
	{
		this.expr.geoWithinPolygon.call(arguments);
		return this;
	}

	getNewObj()
	{
		return this.expr.getNewObj();
	}

	setNewObj(newObj)
	{
		this.expr.setNewObj(newObj);
		return this;
	}

	getQuery(options = [])
	{
		let query = this.query;
		query['query'] = this.expr.getQuery();
		query['newObj'] = this.expr.getNewObj();
		return new Query(this.collection, query, options);
	}

	getQueryArray()
	{
		return this.expr.getQuery();
	}

	setQueryArray(query)
	{
		this.expr.setQuery(query);
		return this;
	}

	getType()
	{
		return this.query['type'];
	}

	group(keys, intial, reduce = null, options = [])
	{
		this.query['type'] = TYPES.TYPE_GROUP;
		this.query['group'] = {
			keys: keys,
			intial: intial,
			reduce: reduce,
			options: options
		};
		return this;
	}

	gt(value)
	{
		this.expr.gt(value);
		return this;
	}

	gte(value)
	{
		this.expr.gte(value);
		return this;
	}

	hint(index)
	{
		this.query['hint'] = index;
		return this;
	}

	immortal(immortal)
	{
		this.query['immortal'] = immortal;
		return this;
	}

	in(values)
	{
		this.expr.in(values)
		return this;
	}

	inc(value)
	{
		this.expr.inc(value);
		return this;
	}

	insert()
	{
		this.query['type'] = TYPES.TYPE_INSERT;
		return this;
	}

	language(language)
	{
		this.expr.language(language);
		return this;
	}

	limit(limit)
	{
		this.query['limit'] = limit;
	}

	lt(value)
	{
		this.expr.lt(value);
		return this;
	}

	lte(value)
	{
		this.expr.lte(value);
		return this;
	}

	map(map)
	{
		this.query['type'] = TYPES.TYPE_MAP_REDUCE;
		this.query['mapReduce'] = {
			map: map,
			reduce: null,
			out: {
				inline: true
			},
			options: {}
		};
		return this;
	}

	mapReduce(map, reduce, out = {inline: true}, options = {})
	{
		this.query['type'] = TYPES.TYPE_MAP_REDUCE;
		this.query['mapReduce'] = {
			map: map,
			reduce: reduce,
			out: out,
			options: options
		};
		return this;
	}

	mapReduceOptions(options)
	{
		if (this.query['type'] !== TYPES.TYPE_MAP_REDUCE) {
			throw new Err();
		}

		this.query['mapReduce']['options'] = options;
		return this;
	}

	max(value)
	{
		this.expr.max(value);
		return this;
	}

	maxDistance(maxDistance)
	{
		if (this.query['type'] === TYPES.TYPE_GEO_NEAR) {
			this.query['geoNear']['options']['maxDistance'] = maxDistance;
		} else {
			this.expr.maxDistance(maxDistance);
		}
		return this;
	}

	maxTimeMS(ms)
	{
		this.query['maxTimeMS'] = ms;
		return this;
	}

	min(value)
	{
		this.expr.min(value);
		return this;
	}

	minDistance(minDistance)
	{
		if (this.query['type'] === TYPES.TYPE_GEO_NEAR) {
			this.query['geoNear']['options']['minDistance'] = minDistance;
		} else {
			this.expr.minDistance(minDistance);
		}
		return this;
	}

	mod(divisor, reminder = 0)
	{
		this.expr.mod(divisor, reminder);
		return this;
	}

	mul(value)
	{
		this.expr.mul(value);
		return this;
	}

	multiple(multiple = true)
	{
		this.query['multiple'] = multiple;
		return this;
	}

	near(x, y)
	{
		this.expr.near(x, y);
		return this;
	}

	nearSphere(x, y = null)
	{
		this.expr.nearSphere(x, y);
		return this;
	}

	not(expr)
	{
		this.expr.not(expr);
		return this;
	}

	notEqual(value)
	{
		this.expr.notEqual(value);
		return this;
	}

	notIn(values)
	{
		this.expr.notIn(values);
		return this;
	}

	out(out)
	{
		if (this.query['ype'] !== TYPES.TYPE_MAP_REDUCE) {
			throw new Err();
		}

		this.query['mapReduce']['out'] = out;
		return this;
	}

	popFirst()
	{
		this.expr.popFirst();
		return this;
	}

	popLast()
	{
		this.expr.popLast();
		return this;
	}

	pull(valueOrExpression)
	{
		this.expr.pull(valueOrExpression);
		return this;
	}

	pullAll(values)
	{
		this.expr.pullAll(values);
		return this;
	}

	push(valueOrExpression)
	{
		this.expr.push(valueOrExpression);
		return this;		
	}

	pushAll(values)
	{
		this.expr.pushAll(values);
		return thisl
	}

	range(start, end)
	{
		this.expr.range(start, end);
		return this;
	}

	reduce(reduce)
	{
		switch (this.query['type']) {
			case TYPES.TYPE_MAP_REDUCE:
				this.query['mapReduce']['reduce'] = reduce;
			break;
			case TYPES.TYPE_GROUP:
				this.query['group']['reduce'] = reduce;
			break;
			default:
				throw new Err();
		}
		return this;
	}

	remove()
	{
		this.query['type'] = TYPES.TYPE_REMOVE;
		return this;
	}

	rename(name)
	{
		this.expr.rename(name);
		return this;
	}

	returnNew(returnNew = true)
	{
		this.query['new'] = returnNew;
		return this;
	}

	select(fieldName = null)
	{
		if (typeof this.query['select'] === 'undefined') {
			this.query['select'] = [];
		}

		$fieldNames = fieldName instanceof Array ? fieldName: arguments;

		for (let i in fieldNames) {
			this.query['select'][fieldNames[i]] = 1;
		}

		return this;
	}

	selectElemMatch(fieldName, expr)
	{
		if (expr instanceof Expr) {
			expr = expr.getQuery();
		}

		this.query['select'][fieldName] = {'$elemMatch': expr};
		return this;
	}

	selectMeta(fieldName, metaDataKeyword)
	{
		this.query['select'][fieldName] = {'$meta': metaDataKeyword};
		return this;
	}

	selectSlice(fieldName, countOrSkip, limit = null)
	{
		let slice = countOrSkip;
		if (limit !== null) {
			slice = [slice, limit];
		}

		this.query['select'][fieldName] = {'$slice': slice};
		return this;
	}

	set(value, atomic = true)
	{
		this.expr.set(value, atomic && this.query['type'] !== TYPES.TYPE_INSERT);
		return this;
	}

	setOnInsert(value)
	{
		this.expr.setOnInsert(value);
		return this;
	}

	setReadPreference(readPreference, tags = null)
	{
		this.query['readPreference'] = readPreference;
		this.query['readPreferenceTags'] = tags;
		return this;
	}

	size(size)
	{
		this.expr.size(size);
		return this;
	}

	skip(skip)
	{
		this.expr.skip(skip);
		return this;
	}

	slaveOkay(slaveOkay = true)
	{
		this.query['slaveOkay'] = slaveOkay;
		return this;
	}

	snapshot(snapshot)
	{
		this.query['snapshot'] = snapshot;
		return this;
	}

	sort(fieldName, order = 1)
	{
		if (typeof this.query['sort'] === 'undefined') {
				this.query['sort'] = {};
		}

		let fields = fieldName instanceof Array ? fieldName : arguments;

		for (let i in fields) {
			if (typeof order === 'string') {
				order = order.toLowerCase() === 'asc' ? 1: -1;
			}

			this.query['sort'][i] = order;
		}
		return this;
	}

	sortMeta(fieldName, metaDataKeyword)
	{
		if (typeof this.query['select'][fieldName] === 'undefined') {
			this.selectMeta(fieldName, metaDataKeyword);
		}

		this.query['sortMeta'][fieldName] = {'$meta': metaDataKeyword};
		return this;
	}

	spherical(spherical = true)
	{
		if (this.query['type'] !== TYPES.TYPE_GEO_NEAR) {
			throw new Err();
		}

		this.query['geoNear']['options']['spherical'] = spherical;
		return this;
	}

	text(search)
	{
		this.expr.text(search);
		return this;
	}

	type(type)
	{
		this.expr.type(type);
		return this;
	}

	unsetField()
	{
		this.expr.unsetField();
		return this;
	}

	update()
	{
		this.query['type'] = TYPES.TYPE_UPDATE;
		return this;
	}

	updateOne()
	{
		this.query['type'] = TYPES.TYPE_UPDATE;
		this.query['multiple'] = false;
		return this;
	}

	updateMany()
	{
		this.query['type'] = TYPES.TYPE_UPDATE;
		this.query['multiple'] = true;
		return this;
	}

	upsert(upsert)
	{
		this.query['upsert'] = upsert;
		return this;
	}

	where(javascript)
	{
		this.expr.where(javascript);
		return this;
	}

	withinBox(x1, y1, x2, y2)
	{
		this.expr.withinBox(x1, y1, x2, y2);
		return this;
	}

	withinCenter(x, y, radius)
	{
		this.expr.withinCenter(x, y, radius);
		return this;
	}

	withinCenterSphere(x, y, radius)
	{
		this.expr.withinCenterSphere(x, y, radius);
		return this;
	}

	withinPolygon()
	{
		this.expr.withinPolygon.call(arguments);
		return this;
	}
}