const mongoose = require("mongoose");

const mongoUri = "mongodb://localhost:27017/Notes" ;

const connectToMongo = async()=>{
    await mongoose.connect(mongoUri).then(()=>{
        console.log("connected to mongodb");
    });
    // console.log("connected to mongodb successfully")
}

module.exports = connectToMongo; 