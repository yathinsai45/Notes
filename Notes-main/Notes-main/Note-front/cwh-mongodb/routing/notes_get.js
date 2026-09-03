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
        console.log("yes we have");
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

// to delete the note
GetData.delete("/deletenotes/:id",async (req,res)=>{
    const user_id = await JSON.stringify(req.header("id"));
    const id = await req.params.id;
    // checking the user id correct or not;
    const note = await Note.findById(id);
    if(!note){
        return console.log("note not found");
    }
    const user = JSON.stringify(note.user)
    if(user !== user_id){
        return console.log(user,user_id);
    }
    
    const deletednote = await Note.findByIdAndDelete(id);
    res.json({"deleted note": deletednote})
})

// to update notes , we need to be careful such that only the user can change it;
// GetData.put("/updatenote/:newid",async (req,res)=>{

    // destructuring
    // const title = await req.body.title;
    // const description = await req.body.description;

    // const newNote = {}
    // if(title) {newNote.title = title};
    // if(description) {newNote.description = description};

    // first checking whether he is the user or not
    // firts check
    // let noteexist = await Note.findById(req.params.newid);
    // if(!noteexist){
    //     return res.send("not found");
    // }
    // second check
    // const user = await JSON.stringify(noteexist.user);
    // const user_id = await JSON.stringify(req.header("id"));

    // if(user !== user_id ){
    //     return res.send("not allowed");
    // }

    // if true
    // noteexist = await Note.findByIdAndUpdate(req.params.newid , {$set : newNote} , {new : true});
    // res.json({noteexist});
// })
GetData.put("/updatenote/:newid", async (req, res) => {
    // Destructuring
    const { title, description } = req.body;
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;

    // Checking whether the note exists
    let noteexist = await Note.findById(req.params.newid);
    if (!noteexist) {
        return res.status(404).send("Note not found");
    }

    // Checking if the user is authorized
    const user = noteexist.user.toString();
    const user_id = req.user.id.toString();

    if (user !== user_id) {
        return res.status(401).send("Not allowed");
    }

    // Updating the note if authorized
    noteexist = await Note.findByIdAndUpdate(req.params.newid, { $set: newNote }, { new: true });
    res.json(noteexist);
});

module.exports = GetData;