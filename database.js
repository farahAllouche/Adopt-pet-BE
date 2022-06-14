const mongoose = require('mongoose')
require('dotenv').config()


console.log("url", process.env.DATABASE_URL);
mongoose.connect(process.env.DATABASE_URL).then(()=> {
    console.log("connected to db !")
})