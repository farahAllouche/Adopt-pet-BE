function requireUser(req, res, next) {

  //console.log("user" , req.user);

    if (!req.user) {
      
      return res.status(403).send({message : "Invalid session"});
    }

    return next();

    
  }

module.exports = {requireUser}