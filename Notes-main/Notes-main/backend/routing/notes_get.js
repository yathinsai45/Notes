const express = require("express");
const GetData = express.Router();

const Note = require("../schema/Notes");
const Users = require("../schema/Users");
const { body, validation, validationResult } = require("express-validator");


// to get user notes by "getnotes";
GetData.get("/getnotes",async (req,res)=>{
    const id= await req.header("id");
    if(!id){
        res.send("please check the id u have given");
    }
    console.log(id);

    const personNotes = await Note.find({user : id});
    if(personNotes){
        res.json(personNotes);
    }
})

// to get user account using getaccount;
GetData.get("/getaccount",async (req,res)=>{
    const id= await req.header("id");
    if(!id){
        res.send("please check the id u have given");
    }
    console.log(id);

    const acc= await Users.findById(id).select("-password");
    if(acc){
        res.json(acc);
    }
})

// to update notes , we need to be careful such that only the user can change it;
GetData.put("/updatenotes/:id",async (req,res)=>{

    // destructuring
    const {title,description} = req.body;
    const newNote = {}
    if(title) {newNote.title = title};
    if(description) {newNote.description = description};

    // first checking whether he is the user or not
    // firts check
    const noteexist = await Note.findById(req.params.id);
    if(!noteexist){
        return res.send("not found");
    }
    // second check
    const id= await req.header("id");
    if(!id){
        res.send("please check the id u have given");
    }
    console.log(id);
    if(noteexist.user.toString() !== id ){
        return res.send("not allowed");
    }

    // if true
    res.json(Note.findByIdAndUpdate(req.params.id , {$set : newNote} , {new : true}));

})

module.exports = GetData;