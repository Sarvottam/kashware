
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const ExpressConfigModule = require('./expressConfig');
const {verifyJWT} = require("../utils/authMiddleware")

class AppConfig {
  constructor(app) {
    process.on('unhandledRejection', (reason, p) => {
      console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);

      // application specific logging, throwing an error, or other logic here
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
