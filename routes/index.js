const express =require('express');
const path =require('path');


class Routes {
  constructor(app) {
    this.app = app;
  }

  /* creating app Routes starts */
  appRoutes() {
    var v1 = express.Router();
    this.app.use('/api', v1);
    v1.use('/auth',require("./auth"));
    v1.use('/modify',require("./objectService"));
    v1.use('/image',require("./imageService"))

  }

  routesConfig() {
    this.appRoutes();
  }
}
module.exports = Routes;
