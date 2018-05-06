const path = require('path');

const APP_DIRNAME = 'application';
const APP_PATH = path.join(path.dirname(require.main.filename), APP_DIRNAME);
const CONFIG_DIR = path.join(path.dirname(require.main.filename), 'config');

const DB_URL = 'mongodb://localhost:27017/test';

module.exports = {
	APP_DIRNAME,
	APP_PATH,
	CONFIG_DIR,
	DB_URL
};