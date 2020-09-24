const JWT = require('jsonwebtoken');
const { JWT_PRIVATE_KEY } = require('../config/constant');

module.exports = {
  generateJWT(payloadDataObj) {
    try {
      _logger.debug('JWT payloadData ', payloadDataObj);
      return JWT.sign({ exp: Math.floor(Date.now() / 1000) + 24 * (60 * 60), data: payloadDataObj },
        JWT_PRIVATE_KEY);
    } catch (e) {
      _logger.error('Error generating JWT  ', e);
      throw new Error(e);
    }
  },

  verifyJWT(req, res) {
    try {
      const { exp, data } = JWT.verify(req.headers.authorization, JWT_PRIVATE_KEY);

      if (exp < Date.now().valueOf() / 1000) {
        throw new Error('JWT Token expired');
      }
      _logger.debug('user data from jwt ', data);
      return data;
    } catch (e) {
      _logger.error('JWT verification error ', e);
      return _handleResponse(req, res, e);
    }
  },
  // eslint-disable-next-line consistent-return
  checkLoggedIn(req, res, next) {
    try {
      const user = res.locals.loggedInUser;
      if (!user) {
        return _handleResponse(req, res, { message: 'You need to be logged in to access this route', code: 405 });
      }
      req.user = user;
      next();
    } catch (error) {
      _logger.error('check loggedIn user ', error);
      throw (error);
    }
  },
};
