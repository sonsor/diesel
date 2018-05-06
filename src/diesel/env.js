const path = require('path');
const ENV = require(path.resolve(path.join(path.dirname(require.main.filename), 'constants')));
module.exports = { ENV };