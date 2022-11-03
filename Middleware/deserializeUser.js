const jwt = require('jsonwebtoken')
const {checkRefreshToken} = require('../Session/session.controller')
const { verifyJWT, signJWT} = require('../Session/jwt.utils')



function deserializeUser (req, res, next) {
  
    const { accessToken, refreshToken } = req.cookies;
    
    
    if (!accessToken) {
        return next();
      }
      const { payload : user, expired } = verifyJWT(accessToken);
      //console.log('user', expired);
      if (user) {
          req.user = {name : user.name, userId : user.userId};
          return next();
        }
        let newUser;
        expired && checkRefreshToken(refreshToken).then((token)=> {
          newUser=  token? verifyJWT(token).payload : null;
          if (!newUser) {
            
            return next();
          }
    
        const newAccessToken = signJWT({name : newUser.name, userId : newUser.userId}, "15m")
    
      
        res.cookie("accessToken", newAccessToken, {
          maxAge: 3.154e10, 
          httpOnly: true,
        });
    
        req.user = {name : newUser.name, userId : newUser.userId};
        return next()
          
        })

    



}

module.exports = {deserializeUser }