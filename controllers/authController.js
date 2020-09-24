const { generateJWT } = require('../utils/authMiddleware');

module.exports = {
  login: async (req, res) => {
    const { userName, password } = req.body;
    try {
      _logger.debug('userNameinfo', userName);
      if (!userName || userName.length > 30) {
        throw new Error('userName missing or invalid');
      }
      if (!password || password.length > 30) {
        throw new Error('password missing or invalid');
      }
      // generateJWT
      const jwtToken = await generateJWT({ userName });
      return _handleResponse(req, res, null, { jwtToken });
    } catch (e) {
      _logger.error('Error in login  ', e);
      return _handleResponse(req, res, e);
    }
  },
};
