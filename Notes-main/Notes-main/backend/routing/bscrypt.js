const express = require("express");
const bscrypt = express.Router();
const Users = require("../schema/Users");
const bcrypt = require("bcryptjs");

const {body,validationResult} = require("express-validator")

bscrypt.post("/bscrypt",[
    body("name","enter valid name").isLength({min:3}),
    body("email","enter perfect email").isEmail(),
    body("password","enter better password").isLength({min:6})
],async (req,res)=>{

    const errors = validationResult(req.body);
    if(!errors.isEmpty()){
        res.status(200).json({errors : errors.array()});
    }

    let value = await Users.findOne({email : req.body.email});
    if(value){
        res.status(200).json({message : "email should be unique"});
    }

// using the password hashing 
// entered password = hashpassword
    const salt = await bcrypt.genSaltSync(10);
    const hashPassword =  await bcrypt.hashSync(req.body.password,salt);
    await Users.create({
        text : req.body.text,
        name : req.body.name,
        email : req.body.email,
        password : hashPassword
    }).then(users => res.send(users))
    .catch(err => console.log(err));
})

module.exports = bscrypt;