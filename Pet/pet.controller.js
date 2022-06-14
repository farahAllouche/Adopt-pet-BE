const {Pet} = require('./pet.schema')


function addPet (petDetails) { 

    return Pet.create(petDetails).then(petData => {
        console.log(petData);
        return petData
    }) 

}

function getPet (petId) {
    return Pet.findOne({_id : petId}).then((pet) => {
        console.log("pet", pet);
        if (!pet) throw new Error( "Pet not found")
        else return pet
    
    })
}

function getAllPet () {
    console.log();
    return Pet.find().then((pets) => {
        
        return pets
    
    })
}


function updatePet (petDetails) {
    return Pet.findOneAndUpdate({_id :petDetails.id},   petDetails , {new :true})
    .then((pet)=> {
        console.log("pet", pet);
      return pet
    })
}

function deletePet (petId) {
    console.log("petId", petId);
    return Pet.deleteOne({_id : petId}).then((pet)=> {
        console.log("pet", pet);
        return pet

    })
}


module.exports= {addPet, getPet, getAllPet, updatePet, deletePet}