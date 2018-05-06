const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('express-logger');
const { router } = require('diesel/router');

/**
 * This class can create a new express application that will provided to server
 */
class App
{

    /**
     * [constructor the App class constructor]
     * @return {App} [return the new instance of App class]
     */
    constructor() {
        this.app = express();
        this.middlewares();
    }

    /**
     * [getApp getter for app property]
     * @return {express.Application} [return the express.Application instance]
     */
    getApp()
    {
        return this.app;
    }

    /**
     * [create a static method to create new express application]
     * @return {express.Application} [return the express.Application instance]
     */
    static create()
    {
        return new App().getApp();
    }

    /**
     * [middlewares sets the middleware that a nessary for application]
     * @return {void}
     */
    middlewares()
    {
        //this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: false
        }));
        this.app.use(router.getInstance()); 
    }
}

module.exports = App.create();