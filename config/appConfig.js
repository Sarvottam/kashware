
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const ExpressConfigModule = require('./expressConfig');
const {verifyJWT} = require("../utils/authMiddleware")
const pino = require('pino');
const expressPino = require('express-pino-logger');

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
const expressLogger = expressPino({ logger });
class AppConfig {
  constructor(app) {
    global._logger = logger
    process.on('unhandledRejection', (reason, p) => {
      _logger.error(reason)
      // console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    });
    this.app = app;
  }

  includeConfig() {
    this.loadAppLevelConfig();
    this.loadExpressConfig();
  }

  loadAppLevelConfig() {
    this.app.use(
      bodyParser.json(),
      bodyParser.urlencoded({ extended: true }),
      expressLogger
    );
    this.app.use(
      express.static(__dirname + '/public'),
      cors(),
    );
    
    require("../responseHandler");
    this.app.use(async (req, res, next) => {
      if (req.headers['authorization']) {
        try {
          //check for JWTHere
          let {userName} =  verifyJWT(req,res)
          res.locals.loggedInUser = userName;
          next();
        } catch (e) {
          return _handleResponse(req, res, e);
        }
      } else {
        next();
      }
    });

  }

  loadExpressConfig() {
    new ExpressConfigModule(this.app).setAppEngine();
  }
}
module.exports = AppConfig;
