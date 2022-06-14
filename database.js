const mongoose = require('mongoose')


console.log("url", process.env.DATABASE_URL);
mongoose.connect(process.env.DATABASE_URL).then(()=> {
    console.log("connected to db !")
})