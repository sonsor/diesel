class QueryBuilder
{
	constructor()
	{
		this.db = {};
		this.query = {};
	}

	select()
	{
		if (arguments.length <= 0) {
			return this;
		}

		this.isSelect = true;
	}
}