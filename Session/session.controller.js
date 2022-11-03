const {User, RefreshToken} = require("./session.schema")
const bcrypt = require("bcrypt");
const {signJWT} = require('./jwt.utils')

function saveRefreshToken (refreshToken) {
   RefreshToken.create({token : refreshToken})
}

function checkRefreshToken (refreshToken) {
   return refreshToken && RefreshToken.findOne({token : refreshToken}).then((token) => {
     //console.log(token);
    return token ? token.token : null})
    
}
function login (user) {
  const accessToken = signJWT(user, "15m")
  const refreshToken = signJWT(user, "1y")
  saveRefreshToken(refreshToken)
  return { accessToken: accessToken, refreshToken: refreshToken }
}


function logout (refreshToken) {
  return RefreshToken.deleteOne({token : refreshToken}).then((token)=> {
    return token ? token.token : null
  })
}



function getUser(email) {
    return User.findOne({email}).then((user) => {
        return user

    })
  }

  function getUserInfo (userId) {

    return User.findOne({_id : userId}).then((user)=>{
        //console.log(user);
        return user
    })
}



function updateUserInfo (userId, userDetails) {

  //console.log("userDetails", userDetails);

    return User.findOneAndUpdate({_id :userId}, userDetails,{new :true}).then((user)=> {

      return user
    })
  }


function intrestedIn(userId, fav) {
  return User.findOneAndUpdate({_id :userId},  { intrestedIn: fav  } , {new :true})
  .then((user)=> {
    return user
  })
}


function register(userDetails) {
    const { password } = userDetails;
    const hashPassword = bcrypt.hashSync(password, 10);
    userDetails.password = hashPassword;

    return User.create(userDetails).then((user) => {
      
      const accessToken = signJWT({name : user.name, userId :  user.id}, "15s")
      const refreshToken = signJWT({name : user.name, userId :  user.id}, "1y")
      saveRefreshToken(refreshToken)

      //console.log();
    
      return { accessToken: accessToken, refreshToken: refreshToken,userId :  user.id }
       
    })
}

  module.exports = {getUser , register, login, checkRefreshToken, logout, getUserInfo, updateUserInfo, intrestedIn}