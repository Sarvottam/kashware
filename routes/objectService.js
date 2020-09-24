const express = require('express');

const router = express.Router();
const { objectServiceController } = require('../controllers');
const { checkLoggedIn } = require('../utils/authMiddleware');

router.patch('/patchRequest', checkLoggedIn, objectServiceController.modifyRequest);

module.exports = router;
