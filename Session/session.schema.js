const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
  photo : String,
  age : Number,
  gender : {
    type: String,
    enum: ["male", "female"],
  },
  bio : String,
  phone : String, 
  intrestedIn : [mongoose.Types.ObjectId]
});

UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret.password;
    delete ret._id;
  },
});

const User = new mongoose.model("User", UserSchema);

const RefreshTokenSchema = mongoose.Schema({
  token : {
    type : String,
    required : true
  }

})

const RefreshToken = new mongoose.model("RefreshToken", RefreshTokenSchema);



module.exports = {User, RefreshToken};
