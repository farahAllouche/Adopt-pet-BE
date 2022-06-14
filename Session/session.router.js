const express = require('express');
const { deserializeUser } = require('../Middleware/deserializeUser');
const { loginHandler , getSessionHandler, registerHandler, logoutHandler, getUserInfoHandler, updateInfoUserHandler, updateUserInerest, getUserHandler} = require('./session.services')
const {requireUser} = require('../Middleware/requireUser')
const router = express.Router()



router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.get("/session",deserializeUser,requireUser, getSessionHandler);
router.delete("/logout", logoutHandler);
router.get("/account", deserializeUser, requireUser, getUserInfoHandler);
router.patch("/account", deserializeUser, requireUser, updateInfoUserHandler);
router.patch("/userInterest",  deserializeUser, requireUser, updateUserInerest)
router.post("/user",  deserializeUser, requireUser, getUserHandler)
module.exports = router