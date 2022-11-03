const express = require('express');
const {addLostPetHandler, getAllLostPetHandler, DeleteLostPetHandler, updateLostPetHandler, GetLostPetHandler} =require('./lost.services') 
const { deserializeUser } = require('../Middleware/deserializeUser');
const {requireUser} = require('../Middleware/requireUser')

const router = express.Router()

router.post('/add',deserializeUser,requireUser,addLostPetHandler)
router.get('/',deserializeUser,requireUser,getAllLostPetHandler)
router.post('/',deserializeUser, requireUser, GetLostPetHandler)
router.delete('/delete/:petId',deserializeUser,requireUser, DeleteLostPetHandler)
router.put('/update/:petId',deserializeUser, requireUser, updateLostPetHandler)



module.exports = router