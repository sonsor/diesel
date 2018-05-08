class QueryBuilder
{
	constructor()
	{
		this.db = {};
		this.query = {};

		this.isSelect = false;
		this.isUpdate = false,
		this.isCreate = false;
		this.isRemove = false;
	}

	select()
	{
		if (arguments.length <= 0) {
			return this;
		}

		this.isSelect = true;
	}
}