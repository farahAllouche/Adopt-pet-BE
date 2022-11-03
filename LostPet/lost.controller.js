const {LostPet} = require('./lost.schema')
var moment = require('moment');




function addLostPet (petDetails) {
    return LostPet.create({...petDetails, date :moment().format("YYYY/MM/DD HH:mm:ss")}).then(petData => {
        console.log(petData);
        return petData
    }) 
}

function getAllLostPet() {
    return LostPet.find().then((lostPets) => {
        
        
        return lostPets
    
    })
}

function deleteLostPet (petId) {
    console.log("petId", petId);
    return LostPet.deleteOne({_id : petId}).then((pet)=> {
        console.log("pet", pet);
        return pet

    })
}

function updateLostPet (petDetails, petId){
    console.log("petDetails", petDetails);

    return LostPet.findOneAndUpdate({_id :petId},   petDetails , {new :true})
    .then((pet)=> {
      return pet
    })

}  

function getLostPet (petId) {
    return LostPet.findOne({_id : petId}).then((pet) => {
        console.log("pet", pet);
        if (!pet) throw new Error( "Pet not found")
        else return pet
    
    })
}

module.exports= {addLostPet, getAllLostPet, deleteLostPet, updateLostPet, getLostPet}