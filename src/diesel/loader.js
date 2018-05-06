const fs = require('fs');
const path = require('path');
const { ENV } = require('./env');

/**
 * [CoreLoader description]
 * @type {[type]}
 */
class Loader
{
    /**
     * [constructor description]
     * @param {any} ENV [description]
     */
    constructor(ENV)
    {
        let dir = path.resolve(ENV.APP_PATH);
    	this.CONTROLLERS_PATH = path.join(dir, 'Controllers');
    	this.SERVICES_PATH = path.join(dir, 'Services');
    	this.DOCUMENTS_PATH = path.join(dir, 'Documents');
    	this.MIDDILEWARE_PATH = path.join(dir, 'Middlewares');
    }

    /**
     * [load description]
     * @param  {string}             type [description]
     * @param  {string}             name [description]
     * @return {iControllerFactory}      [description]
     */
    load(type = '', name = '')
    {
    	let parts = name.split(path.sep);
    	let fileName = parts.pop();
    	let dir = parts.join(path.sep);
    	let files = [];

        switch (type) {
	        case 'controller':
            case 'C':
	        	dir = path.join(this.CONTROLLERS_PATH, dir);
	        break;
	        case 'service':
            case 'S':
	        	dir = path.join(this.SERVICES_PATH, dir);
	        break;
	        case 'document':
            case 'D':
	        	dir = path.join(this.DOCUMENTS_PATH, dir);
	        break;
	        case 'middleware':
            case 'M':
	        	dir = path.join(this.MIDDILEWARE_PATH, dir);
	        break;
	    }
        
        if (dir) {
        	dir = path.join(dir, path.sep);
        	files = this.getFiles(dir, [], fileName);
        }
        
        if (files.length > 0) {

        	let obj = require(files[0]);
        	return obj;
        	
        }
        
    }

    /**
     * [getController description]
     * @param  {string} name [description]
     * @return {any}         [description]
     */
    getController(name)
    {
    	name = this.parse(name, 'C');        
        return this.load('C', name);
    }

    /**
     * [getService description]
     * @param  {string} name [description]
     * @return {any}         [description]
     */
    getService(name)
    {
    	name = this.parse(name, 'S');
    	return this.load('S', name);
    }

    /**
     * [getDocument description]
     * @param  {string} name [description]
     * @return {any}         [description]
     */
    getDocument(name)
    {
    	name = this.parse(name, 'D');
    	return this.load('D', name);
    }

    /**
     * [getMiddleware description]
     * @param  {string} name [description]
     * @return {any}         [description]
     */
    getMiddleware(name)
    {
    	name = this.parse(name, 'M');
    	return this.load('M', name);
    }

    /**
     * [parse description]
     * @param {string} name [description]
     * @param {string} type [description]
     */
    parse(name, type)
    {
    	name = name.replace('\\', path.sep);
    	switch (type) {
    		case 'controller':
            case 'C':
    			name += 'ControllerFactory.js';
    		break;
    		case 'service':
            case 'S':
    			name += 'Factory.js';
    		break;
    		case 'document':
            case 'D':
    			name += 'Document.js';
    		break;
    		case 'middleware':
            case 'M':
    			name += '.js';
    		break;
    	}
    	return name;
    }

    /**
     * [getRoutes description]
     * @return {Array<any>} [description]
     */
    getRoutes()
    {
        let fileName = path.resolve(path.join(ENV.CONFIG_DIR, 'routes'));
        let routes = require(fileName);
        return routes;
    }

    /**
     * [getFiles description]
     * @param  {string}   dir      [description]
     * @param  {Array}    filelist [description]
     * @param  {string}   fileName [description]
     * @return {Array <any>}                [description]
     */
    getFiles(dir = '.', filelist = [], fileName = '')
    {
        let self = this;
        fs.readdirSync(dir).forEach(function(file) {

            if (fs.statSync(path.join(dir, file)).isDirectory()) {
                filelist = self.getFiles(path.join(dir, file), filelist, fileName);
            } else if (file.toString() == fileName) {
                filelist = filelist.concat(path.join(dir, file));
            }

        });
        return filelist;
    }
}

module.exports = {loader: new Loader(ENV)};