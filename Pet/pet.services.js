const {addPet, getPet, getAllPet, updatePet, deletePet} = require('./pet.controller')

function addPetHandler (req, res) {

    console.log(req.body);
    
    const petDetails ={...req.body, userId : req.user.userId}


    addPet(petDetails).then(petData => {
        console.log("doje");
        res.send(petData)
    })
    .catch((err)=> {
        console.log("err");
    })

}


function GetPetHandler (req, res) {
    console.log(req.body);
    const {id} =req.body

    getPet(id).then((pet)=> {
        res.send(pet)
    })
    .catch((err)=> {
        res.status(404).send("Pet not found ! ");
    })

}

function GetAllPetHandler (req, res) {
    getAllPet().then((pets)=> {
        res.send(pets)
    })
}

function updatePetHandler (req, res) {
    const petDetails = req.body
    updatePet(petDetails).then((pet)=> {
        res.send(pet)
    })
    .catch((err)=> {
        res.status(404).send("Pet not found ! ");
    })
}

function deletePetHandler (req, res) {
    const {petId} = req.params
    console.log(petId);
    deletePet(petId).then((pet)=> {
        res.send(pet)
    })
    .catch((err)=> {
        res.status(404).send("Pet not found ! ");
    })

}

module.exports = {addPetHandler, GetPetHandler, GetAllPetHandler, updatePetHandler, deletePetHandler}