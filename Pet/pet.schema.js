const mongoose = require("mongoose");

const PetSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ageY : {
    type: Number,
    required: true,
  },
  ageM : {
    type: Number,
    required: true,
  },
  gender : {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  spices : {
    type: String,
    enum: ["cat", "dog"],
    required: true,
  },
  weight : {
    type: Number,
    required: false,
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
  vaccinated : {
    type: Boolean,
    required: true,
  },
  children : {
    type: Boolean,
    required: true,
  },
  cats : {
    type: Boolean,
    required: true,
  },
  dogs : {
    type: Boolean,
    required: true,
  },
  activity : {
    type: Number,
    required: true,
  },
  training : {
    type: Number,
    required: true,
  },
  health : {
    type: Number,
    required: true,
  },
  kindness : {
    type: Number,
    required: true,
  },
  photo : String,
  about : {
    type: String,
    required: true,
  },
  userId : {
    type : mongoose.Types.ObjectId,
    required : true,
  }
});

PetSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

const Pet = new mongoose.model("Pet", PetSchema);


module.exports = {Pet};
