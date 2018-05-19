class Configuration
{
	constructor()
	{
		this.attributes = {
			'retryConnect': 0,
			'retryQuery'; 0
		};
	}

	getRetryConnect()
	{
		return this.attribuets.retryConnect;
	}

	setRetryConnect(retryConnect)
	{
		this.attribuets.retryConnect = retryConnect;
	}

	getRetryQuery()
	{
		return this.attributes.retryQuery;
	}

	setRetryQuery(retryQuery)
	{
		this.attributes.retryQuery = retryQuery;
	}
}