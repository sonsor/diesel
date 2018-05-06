const db = require('../database');
/*
@pre<BaseDocument>('save', function(next) {
  this.createdBy = 'wasif';
  this.updatedBy = 'wasif';
  this.createdOn = new Date();
  this.updatedOn = new Date();
  
  console.log("setting created by");
  next();
})*/

/**
 * [iDocument description]
 * @type {[type]}
 */
class BaseDocument
{
	/**
	 * [getModel description]
	 * @param  {any}        model [description]
	 * @param  {iObject =     {}}        options [description]
	 * @return {any}              [description]
	 */
	getModel(model, options = {})
	{
		options.existingMongoose = db.getInstance();
		return super.getModelForClass(model, options);
	}
}

module.exports = { BaseDocument };