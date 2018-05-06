module.exports = function(req, res, next) {
	console.log('its a middle ware calling');
	next();
}