const {addLostPet, getAllLostPet, deleteLostPet, updateLostPet, getLostPet} = require('./lost.controller')
const moment = require('moment');


function addLostPetHandler (req, res) {

    
    const petDetails ={...req.body, userId : req.user.userId}

    console.log("petDetails",petDetails);

    addLostPet(petDetails).then(petData => {
        res.send(petData)
    })
    .catch((err)=> {
        console.log(err);
    })

}

function getAllLostPetHandler (req, res) {
        getAllLostPet().then((pets)=> {
            res.send(pets)
        })
    

}

function DeleteLostPetHandler (req , res ) {
    const {petId} = req.params
    console.log(petId);
    deleteLostPet(petId).then((pet)=> {
        res.send(pet)
    })
    .catch((err)=> {
        res.status(404).send("Pet not found ! ");
    })
}

function updateLostPetHandler (req, res) {
    const petDetails = req.body
    const {petId} = req.params
    updateLostPet(petDetails, petId).then((pet)=> {
        res.send(pet)
    })
    .catch((err)=> {
        res.status(404).send("Pet not found ! ");
    })
}

function GetLostPetHandler (req, res) {
    console.log(req.body);
    const {id} =req.body

    getLostPet(id).then((pet)=> {
        res.send(pet)
    })
    .catch((err)=> {
        res.status(404).send("Pet not found ! ");
    })
}

module.exports = {addLostPetHandler, getAllLostPetHandler, DeleteLostPetHandler, updateLostPetHandler, GetLostPetHandler}