const http = require('http');
const debug = require('debug');
const app = require('./application/App');

/**
 * [Server it actually initlize express app module to node js server]
 */
class Server
{

    /**
     * [constructor]
     * @param  {Any} app: any [The app module]
     * @return {void}
     */
    constructor(app) 
    {
        this.app = app;
        this.setPort();
        this.connect();
    }

    /**
     * [setPort can set the port by normalizing it]
     * @return {void}
     */
    setPort()
    {
        let val = process.env.PORT || 3000;
        let port = (typeof val === 'string') ? parseInt(val, 10) : val;


        if (isNaN(port)) {
            return false;
        }

        if (port < 0) {
            return false;
        }

        this.port = port;
        //this.app.set('port', this.port);
    }

    /**
     * [connect actually create an instancece of http server and connct to server]
     * @return {void}
     */
    connect()
    {
        this.server = http.createServer(this.app);
        this.server.listen(this.port);
        this.server.on('error', this.onError.bind(this));
        this.server.on('listening', this.onListening.bind(this));
    }

    /**
     * [onError execute in case of any error in connection]
     * [error is a instance of exception]
     * @type {void}
     */
    onError(error)
    {
        if (error.syscall !== 'listen') throw error;
        let bind = (typeof this.port === 'string') ? 'Pipe ' + this.port : 'Port ' + this.port;
        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * [onLisening will trigger every time it receives an http request from client]
     * @type {void}
     */
    onListening()
    {
        let addr = this.server.address();
        let port = this.port;
        let bind = (typeof addr === 'string') ? `pipe ${addr}` : 'port ${addr.port}';
        debug(`Listening on ${bind}`);
    }

}

new Server(app);