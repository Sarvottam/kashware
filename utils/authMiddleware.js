const JWT = require("jsonwebtoken");
const { JWT_PRIVATE_KEY, } = require("../config/constant")

module.exports = {
    generateJWT(payloadDataObj) {
        try {
            console.log(JSON.stringify(payloadDataObj));
            return JWT.sign({ exp: Math.floor(Date.now() / 1000) + 24 * (60 * 60), data: payloadDataObj }, JWT_PRIVATE_KEY);
        } catch (e) {
            console.log("ERROR :generateJWT", e)
            throw new Error(e)
        }
    },

    verifyJWT(req, res, next) {
        try {
            const { exp, data } = JWT.verify(req.headers.authorization, JWT_PRIVATE_KEY);

            if (exp < Date.now().valueOf() / 1000) {
                throw ("JWT Token expired")
            }
            return data;
        } catch (e) {
            console.log("HTTP req  verify jwt Error here ", e)
            return _handleResponse(req, res, e);
        }
    },
    async checkLoggedIn(req,res,next) {
        try {
            const user = res.locals.loggedInUser;
            if (!user){
                return _handleResponse(req, res, {message:"You need to be logged in to access this route",code:405});
            }
            req.user = user;
            next()
        } catch (error) {
            throw(error);
        }
    }
}
