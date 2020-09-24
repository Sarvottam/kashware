const { generateJWT } = require("../utils/authMiddleware");

module.exports = {
  login: async (req, res) => {
    let { userName, password } = req.body;
    try {
      if (!userName || userName.length > 30 ) {
        throw "userName missing or invalid";
      }
      if (!password || password.length >30) {
        throw "password missing or invalid";
      }
      // generateJWT
      let jwtToken = await generateJWT({ userName });
      return _handleResponse(req, res, null, { jwtToken});
    } catch (e) {
      console.log("Error login :: ", e);
      return _handleResponse(req, res, e);
    }
  }
}
