const express = require('express');

const router = express.Router();
const { imageServiceController } = require('../controllers');
const { checkLoggedIn } = require('../utils/authMiddleware');

router.get('/getThumbnail', checkLoggedIn, imageServiceController.getThumbnail);

module.exports = router;
