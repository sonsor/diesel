class Expr
{
	constructor()
	{
		this.query = {};
		this.newObj = {};
		this.currentField = '';
	}

	addAnd()
	{
		if (typeof this.query['$and'] === 'undefined') {
			this.query['$and'] = [];
		}

		this.query['$and'] = Array.concat(this.query['$and'], argument.map((expr) => {
			expr instanceof Expr ? expr.getQuery(): expr;
		}));

		return this;
	}

	addManyToSet(values)
	{
		this.requiresCurrentField();
		this.newObj['$addToSet'][this.currentField] = {'$each': values};
		return this;
	}

	addNor()
	{
		if (typeof this.query['$nor'] === 'undefined') {
			this.query['$nor'] = [];
		}

		this.query['$nor'] = Array.concat(this.query['$nor'], argument.map((expr) => {
			expr instanceof Expr ? expr.getQuery(): expr;
		}));

		return this;
	}

	addOr()
	{
		if (typeof this.query['$or'] === 'undefined') {
			this.query['$or'] = [];
		}

		this.query['$or'] = Array.concat(this.query['$or'], argument.map((expr) => {
			expr instanceof Expr ? expr.getQuery(): expr;
		}));

		return this;
	}

	addToSet(valueOrExpression)
	{
		if (valueOrExpression instanceof Expr) {
			valueOrExpression = valueOrExpression.getQuery();
		}

		this.requiresCurrentField();
		this.newObj['$addToSet'][this.currentField] = valueOrExpression;
		return this;
	}

	all(values)
	{
		return this.operator('$all', values);
	}

	bit(operator, value)
	{
		this.requiresCurrentField();
		this.newObj['$bit'][this.currentField][operator] = value;
		return this;
	}

	bitAnd(value)
	{
		return this.bit('and', value);
	}

	bitOr(value)
	{
		return this.bit('or', value);
	}

	bitsAllClear(value)
	{
		this.requiresCurrentField();
		return this.operator('$bitsAllClear', value);
	}

	bitsAllSet(value)
	{
		this.requiresCurrentField();
		return this.operator('$bitsAllSet', value);
	}

	bitsAnyClear(value)
	{
		this.requiresCurrentField();
		return this.operator('$bitsAnyClear', value);
	}

	bitsAnySet(value)
	{
		this.requiresCurrentField();
		return this.operator('$bitsAnySet', value);
	}

	bitXor(value)
	{
		return this.bit('xor', value);
	}

	caseSensitive(caseSensitive)
	{
		if (typeof this.query['$text'] === 'undefined') {
			throw new Err();
		}

		if (caseSensitive) {
			this.query['$text']['$caseSensitive'] = true;
		} else if (typeof this.query['$text']['$caseSensitive'] !== 'undefined') {
			delete this.query['$text']['$caseSensitive'];
		}
		return this;
	}

	comment(comment)
	{
		this.query['$comment'] = comment;
		return this;
	}

	currentDate(type = 'date')
	{
		if (['date', 'time'].indexOf(type) === -1) {
			throw new Err();
		}

		this.requiresCurrentField();
		this.newObj['$currentDate'][this.currentField]['$type'] = type;
		return this;
	}

	diacriticSensitive(diacriticSensitive)
	{
		if (typeof this.query['$text'] === 'undefined') {
			throw new Err();
		}

		if (diacriticSensitive) {
			this.query['$text']['$diacriticSensitive'] = true;
		} else if (typeof this.query['$text']['$diacriticSensitive'] !== 'undefined') {
			delete this.query['$text']['$diacriticSensitive'];
		}
		return this;
	}

	each(values)
	{
		return this.operator('$each', values)
	}

	elemMatch(expr)
	{
		return this.operator('$elemMatch', expr instanceof Expr ? expr.getQuery(): expr);
	}

	equals(value)
	{
		if (this.currentField) {
			this.query[this.currentField] = value;
		} else {
			this.query = value;
		}
		return this;
	}

	exists(exists)
	{
		return this.operator('$exists', exists);
	}

	field(field)
	{
		tjos/currentField = field;
		return this;
	}

	geoIntersects(geometry)
	{
		if (geometry instanceof Geometry) {
			geometry = geometry.jsonSerialize();
		}

		return this.operator('$geoIntersects', {'$geometry': geometry});
	}

	geoWithin(geometry)
	{
		if (geometry instanceof Geometry) {
			geometry = geometry.jsonSerialize();
		}

		return this.operator('$geoWithin', {'$geometry': geometry});
	}

	geoWithinBox(x1, y1, x2, y2)
	{
		let shape = {'$box': [[x1, y1], [x2, y2]]};
		return this.operator('$geoWithin', shape);
	}

	geoWithinCenter(x, y, radius)
	{
		let shape = {'$center': [[x1, y1], radius]};
		return this.operator('$geoWithin', shape);
	}

	geoWithinCenterSphere(x, y, radius)
	{
		let shape = {'$centerSphere': [[x1, y1], radius]};
		return this.operator('$geoWithin', shape);
	}

	geoWithinPolygon()
	{
		if (arguments.length < 3) {
			throw new Err();
		}

		let shape = {'$polygon': arguments};
		return this.operator('$geoWithin', shape);
	}

	getCurrentField()
	{
		return this.currentField;
	}

	getNewObj()
	{
		return this.newObj;
	}

	setNewObj(newObj)
	{
		this.newObj = newObj;
	}

	getQuery()
	{
		return this.query;
	}

	setQuery(query)
	{
		this.query = query;
	}

	gt(value)
	{
		return this.operator('$gt', value);
	}

	gte(value)
	{
		return this.operator('$gte', value);
	}

	in(values)
	{
		return this.operator('$in', values);
	}

	inc(value)
	{
		this.requiresCurrentField();
		this.newObj['$inc'][this.currentField] = value;
		return this;
	}

	language(language)
	{
		if (typeof this.query['$text'] === 'undefined') {
			throw new Err();
		}

		this.query['$text']['$language'] = language;
		return this
	}

	lt(value)
	{
		return this.operator('$lt', value);
	}

	lte(value)
	{
		return this.operator('$lte', value);
	}

	max(value)
	{
		this.requiresCurrentField();
		this.newObj['$max'][this.currentField] = value;
		return this;
	}

	maxDistance(maxDistance)
	{
		let query = {};
		if (this.currentField) {
			query = this.query[this.currentField];
		} else {
			query = this.query;
		}

		if (typeof query['$near'] === 'undefined' && typeof query['nearSphere'] === 'undefined') {
			throw new Err();
		}

		if (typeof query['$near']['geometry'] !== 'undefined') {
			this.query['$near']['$maxDistance'] =maxDistance;
		} else if (typeof query['$nearSphere']['geometry'] !== 'undefined') {
			this.query['$nearSphere']['$maxDistance'] =maxDistance;
		} else {
			this.query['$maxDistance'] = maxDistance;
		}

		return this;
	}

	min(value)
	{
		this.requiresCurrentField();
		this.newObj['$min'][this.currentField] = value;
		return this;
	}

	minDistance(minDistance)
	{
		let query = {};
		if (this.currentField) {
			query = this.query[this.currentField];
		} else {
			query = this.query;
		}

		if (typeof query['$near'] === 'undefined' && typeof query['nearSphere'] === 'undefined') {
			throw new Err();
		}

		if (typeof query['$near']['geometry'] !== 'undefined') {
			this.query['$near']['$minDistance'] =minDistance;
		} else if (typeof query['$nearSphere']['geometry'] !== 'undefined') {
			this.query['$nearSphere']['$minDistance'] =minDistance;
		} else {
			this.query['$minDistance'] = minDistance;
		}

		return this;
	}

	mod(divisor, remainder = 0)
	{
		return this.operator('$mod', [divisor, remainder]);
	}

	mul(value)
	{
		this.requiresCurrentField();
		this.newObj['$mul'][this.currentField] = value;
		return this;
	}

	near(x, y = null)
	{
		if (x instanceof Point) {
			x = x.jsonSerialize();
		}

		if (x instanceof Array) {
			return this.operator('$near', {'$geometry': x});
		}

		return this.operator('$near', [x, y]);
	}

	nearSphere(x, y = null)
	{
		if (x instanceof Point) {
			x = x.jsonSerialize();
		}

		if (x instanceof Array) {
			return this.operator('$nearSphere', {'$geometry': x});
		}

		return this.operator('$nearSphere', [x, y]);
	}

	not(expr)
	{
		return this.operator('$not', expr instanceof Expr ? expr.getQuery(): expr);
	}

	notEqual(value)
	{
		return this.operator('$ne', value);
	}

	notIn(values)
	{
		return this.operator('$nin', values);
	}

	operator(operator, value)
	{
		this.wrapEqualityCriteria();

		if (this.currentField) {
			this.query[this.currentField][operator] = value;
		} else {
			this.query[operator] = value;
		}
		return this;
	}

	popFirst()
	{
		this.requiresCurrentField();
		this.newObj['$pop'][this.currentField] = 1;
		return this;
	}

	popLast()
	{
		this.requiresCurrentField();
		this.newObj['$pop'][this.currentField] = -1;
		return this;
	}

	position(position)
	{
		return this.operator('$position', position);
	}

	pull(valueOrExpression)
	{
		if (valueOrExpression instanceof Expr) {
			valueOrExpression = valueOrExpression.getQuery();
		}

		this.requiresCurrentField();
		this.newObj['$pull'][this.currentField] = valueOrExpression;
		return this;
	}

	pullAll(values)
	{
		this.requiresCurrentField();
		this.newObj['$pullAll'][this.currentField] = values;
		return this;
	}

	push(valueOrExpression)
	{
		if (valueOrExpression instanceof Expr) {
			valueOrExpression = Object.assign({'$each': []}, valueOrExpression.getQuery());
		}

		this.requiresCurrentField();
		this.newObj['$push'][this.currentField] = valueOrExpression;
		return this;
	}

	pushAll(values)
	{
		this.requiresCurrentField();
		this.newObj['$pushAll'][this.currentField] = values;
		return this;
	}

	range(start, end)
	{
		return this.operator('$gte', start).operator('$lte', end);
	}

	rename(name)
	{
		this.requiresCurrentField();
		this.newObj['$rename'][this.currentField] = name;
		return this;
	}

	set(value, atomic = true)
	{
		if (atomic) {
			this.newObj['$set'][this.currentField] = value;
			return this;
		}

		if (this.currentField.indexOf('.') === -1) {
			this.newObj[this.currentField] = value;
			return this;
		}

		let keys = this.currentField.split('.');
		let current = this.newObj;
		for (i in keys) {
			current = current[keys[i]];
		}
		current = value;
		return this;
	}

	setOnInsert(value)
	{
		this.requiresCurrentField();
		this.newObj['$setOnInsert'][this.currentField] = value;
		return this;
	}

	size(size)
	{
		return this.operator('$size', size);
	}

	slice(slice)
	{
		return this.operator('$slice', slice);
	}

	sort(fieldName, order = null)
	{
		let fields = fieldName instanceof String ? {[fieldName]: order}: fieldName;
		let sort = {};

		for (fieldName in fields) {
			if (order instanceof String) {
				order = order.toLowerCase() === 'asc' ? 1 : -1;
			}
			sort[fieldName] = order;
		}

		return this.operator('$sort', sort);
	}

	text(search)
	{
		this.query['$text']['search'] = search;
		return this;
	}

	type(type)
	{
		if (type instanceof String) {
			let map = {
                'double' : 1,
                'string' : 2,
                'object' : 3,
                'array' : 4,
                'binary' : 5,
                'undefined' : 6,
                'objectid' : 7,
                'boolean' : 8,
                'date' : 9,
                'null' : 10,
                'regex' : 11,
                'jscode' : 13,
                'symbol' : 14,
                'jscodewithscope' : 15,
                'integer32' : 16,
                'timestamp' : 17,
                'integer64' : 18,
                'maxkey' : 127,
                'minkey' : 255,
            };

            type = typeof map[type] !== 'undefined' ? map[type] : type;
		}

		return this.operator['$type', type];
	}

	unsetField()
	{
		this.requiresCurrentField();
		this.newObj['$unset'][this.currentField] = 1;
		return this;
	}

	where(javascript)
	{
		this.query['$where'] = javascript;
		return this;
	}

	withinBox(x1, y1, x2, y2)
	{
		let shape = {'$box': [[x1, y1], [x2, y2]]};
		return this.operator('$within', shape);
	}

	withinCenter(x, y, radius)
	{
		let shape = {'$center': [[x1, y1], radius]};
		return this.operator('$within', shape);
	}

	withinCenterSphere(x, y, radius)
	{
		let shape = {'$centerSphere': [[x1, y1], radius]};
		return this.operator('$within', shape);
	}

	withinPolygon()
	{
		if (arguments.length < 3) {
			throw new Err();
		}

		let shape = {'$polygon': arguments};
		return this.operator('$geoWithin', shape);
	}

	requiresCurrentField()
	{
		if (!this.currentField) {
			throw new Err();
		}
	}

	wrapEqualityCriteria()
	{
		if (!this.currentField && typeof this.query[this.currentField] === 'undefined') {
			retrun;
		}

		let query = {};
		if (this.currentField) {
			query = this.query[this.currentField];
		} else {
			query = this.query;
		}

		if (query instanceof Object && Object.keys(query).length <- 0 || Object.keys(query)[0].indexOf('$') === 0) {
			return;
		}

		this.query = {'$in': [this.query]};
	}

}