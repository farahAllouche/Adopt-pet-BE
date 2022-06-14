const express = require('express');
const {addPetHandler, GetPetHandler, GetAllPetHandler, updatePetHandler,deletePetHandler} = require('./pet.services')

const { deserializeUser } = require('../Middleware/deserializeUser');
const {requireUser} = require('../Middleware/requireUser')

const router = express.Router()

router.post('/add',deserializeUser,requireUser, addPetHandler)
router.post('/',deserializeUser, requireUser, GetPetHandler)
router.get('/',deserializeUser, requireUser, GetAllPetHandler)
router.put('/update',deserializeUser, requireUser, updatePetHandler)
router.delete('/delete/:petId',deserializeUser, requireUser, deletePetHandler)


module.exports = router