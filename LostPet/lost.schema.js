const mongoose = require("mongoose");

const LostPetSchema = mongoose.Schema({
  age : {
    type: String,
    required: true,
  },
  spices : {
    type: String,
    enum: ["cat", "dog"],
    required: true,
  },
  breed : {
    type: String,
    required: false,
  },
  state : {
    type: String,
    required: true,
  },
  town : {
    type: String,
    required: true,
  } ,
  date : {
    type: String,
    required: true,
  } ,
  photo : String,
  details : {
    type: String,
  },
  userId : {
    type : mongoose.Types.ObjectId,
    required : true,
  }
});

LostPetSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

const LostPet = new mongoose.model("LostPet", LostPetSchema);


module.exports = {LostPet};
