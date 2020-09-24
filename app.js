/* eslint-disable no-console */
const express = require('express');
const http = require('http');
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

const AppConfig = require('./config/appConfig');
const Routes = require('./routes');



class Server {
    constructor() {
        this.app = express();
        // this.app.use(cors());
        this.http = http.Server(this.app)
        global._server = this.app
    }

    appConfig() {
        new AppConfig(this.app).includeConfig();
    }

    /* Including app Routes starts */
    includeRoutes() {
        new Routes(this.app).routesConfig();
    }


    /* Including app Routes ends */

    startTheServer() {
        this.appConfig();
        const port = process.env.NODE_ENV == "dev" ? process.env.PORT_DEV : process.env.PORT_PROD;
        const host = process.env.NODE_ENV == "dev" ? process.env.NODE_SERVER_LOCAL : process.env.NODE_SERVER_HOST_PROD || '0.0.0.0';

        this.http.listen(port, host, () => {
            console.log(`Listening on http://${host}:${port}`);
        });

        this.includeRoutes();
    }
}

module.exports = new Server();
