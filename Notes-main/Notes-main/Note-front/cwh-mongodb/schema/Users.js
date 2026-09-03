const mongoose = require("mongoose");
// const { type } = require("os");
// const { emit } = require("process");
const {Schema} = mongoose;

const UserSchema = new Schema({
    // text:{
    //     type: String,
    //     required : true
    // },
    name:{
        type: String,
        required : true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String,
        required : true
    },
    date:{
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model("user",UserSchema)