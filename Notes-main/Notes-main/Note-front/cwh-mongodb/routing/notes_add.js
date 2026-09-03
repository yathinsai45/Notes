// Adding the users notes in his own account
// so for that we need to get his notes , which can be done by getting the (login) or users id;
// so here we are stroing the data in that account by using the id;


const express = require("express");
const notes = express.Router();

const Note = require("../schema/Notes");
const {body,validationResult} = require("express-validator");

notes.post("/notes",[
    body("title","enter valid title").isLength({min:3}).exists(),
    body("description","enter description").isLength({min:5})
], async (req,res)=>{

    const id= await req.header("id");
    if(!id){
        res.status(401).send({error : "please enter valid id in header"});
    }
    console.log(id);

    const errors = validationResult(req.body);
    if(!errors.isEmpty()){
        res.json({error : errors.array()});
    }

    await Note.create({
        title : req.body.title,
        description : req.body.description,
        user : id
    }).then(note => res.json({note}))
    .catch(err => console.log(err));

})

module.exports = notes;