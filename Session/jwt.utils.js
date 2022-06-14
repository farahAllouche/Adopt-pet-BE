const jwt = require('jsonwebtoken')

function signJWT(obj, expiresIn) {

    return jwt.sign(obj, process.env.TOKEN_SECRET , {  expiresIn: expiresIn });

}

function verifyJWT(token) {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      return { payload: decoded, expired: false };
    } catch (error) {
      return { payload: null, expired: error.message.includes("jwt expired") };
    }
  }

module.exports = {signJWT, verifyJWT}