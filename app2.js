/* eslint-disable no-console */
const express = require('express');
let http = require('http');
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

const AppConfig = require('./config/appConfig');
const Routes = require('./routes');




    
        let app = express();
        // this.app.use(cors());
        http = http.Server(app)
    

    let appConfig = ()=> {
        new AppConfig(app).includeConfig();
    }

    /* Including app Routes starts */
    let includeRoutes = ()=> {
        new Routes(app).routesConfig();
    }


    /* Including app Routes ends */

    let startTheServer = ()=> {
        appConfig();
        const port = process.env.NODE_ENV == "dev" ? process.env.PORT_DEV : process.env.PORT_PROD;
        const host = process.env.NODE_ENV == "dev" ? process.env.NODE_SERVER_LOCAL : process.env.NODE_SERVER_HOST_PROD || '0.0.0.0';

        if (cluster.isMaster) {
            for (var i = 0; i < numCPUs; i++) {
                cluster.fork();
            }
            cluster.on('online', function (worker) {
                console.log('Worker ' + worker.process.pid + ' is online');
            });
            cluster.on('exit', function (worker, code, signal) {
                console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
                console.log('Starting a new worker');
                cluster.fork();
            });
        } else {
            http.listen(port, host, () => {
                console.log(`Listening on http://${host}:${port}`);
            });
        }

        includeRoutes();
    }

    startTheServer()


module.exports = app;
