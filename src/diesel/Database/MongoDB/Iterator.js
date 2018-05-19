class Iterator
{
	constructor(elements)
	{
		this.elements = elements;
		this.commandResult = {};

		this.index = -1;
	}

	count()
	{
		return this.elements.length;
	}

	current()
	{
		return this.elements[this.index - 1];
	}

	first()
	{
		return this.elements[0];
	}

	getCommandResult()
	{
		return this.commandResult;
	}

	setCommandResult(commandResult)
	{
		this.commandResult = commandResult;
	}

	getSingleResult()
	{
		this.index = 0;
		let result = Object.keys[this.elements)[0] !== null ? this.elements[0]: null;
		return result;
	}

	key()
	{
		return Object.keys(this.elements)[0];
	}

	last()
	{
		return this.elements[this.elements.length - 1];
	}

	[Symbol.iterator]() {
	    return {
	    	next: () => ({ value: data[++this.index], done: !(index in data) })
	    };
	}

	offsetExists(offset)
	{
		return typeof this.elements[offset] !== 'undefined';
	}

	offsetGet(offset)
	{
		return typeof this.elements[offset] !== 'undefined' ? this.elements[offset] : null;
	}

	offsetSet(offset, value)
	{
		if (offset === null) {
			this.elements[] = value;
		} else {
			this.elements[offset] = value;
		}
	}

	offsetUnset(offset)
	{
		delete this.elements[offset];
	}

	reset()
	{
		this.index = 0;
	}

	rewind()
	{
		this.index = -1;
	}

	toArray()
	{
		return this.elements;
	}
}