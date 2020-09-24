var express = require("express");
var router = express.Router();
const {objectServiceController} = require("../controllers")
const {checkLoggedIn} = require("../utils/authMiddleware")

router.patch("/patchRequest", checkLoggedIn,objectServiceController.modifyRequest);

module.exports = router
