const express = require("express");
const better = express.Router();
const Users = require("../schema/Users");

const {body,validation, validationResult} = require("express-validator");

better.post("/better",[

    // VALIDATION RULES
    body("name","enter valid name").isLength({min:3}),
    body("email","enter perfect email").isEmail(),
    body("password","enter better password").isLength({min:6})
],async (req,res)=>{
    try{
        // CHECKING CONDITIONS
    const errors = validationResult(req.body);
    if(!errors.isEmpty()){
        res.status(200).json({errors : errors.array()});
    }
    

    // CHECKING THE EMAIL REPEATED OR NOT
    let value = await Users.findOne({email : req.body.email});
    if(value){
        res.status(200).json({message : "email should be unique"});
    }
    await Users.create({
        text : req.body.text,
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    }).catch(err => console.log(err));
    res.json(req.body)
    } catch{
        res.status(500).send("some other error");
    }
})

module.exports = better;