const mongoose = require("mongoose");
const {Schema} = mongoose;

// creating notes schema;
const NotesSchema = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title : {
        type : String,
        required : true
    },
    description :{
        type : String,
        required : true
    },
    date :{
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model("note",NotesSchema);