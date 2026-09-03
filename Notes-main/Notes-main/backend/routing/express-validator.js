const express = require("express");
const validator = express.Router();
const Users = require("../schema/Users");
const { body, validationResult } = require('express-validator');
// const { errors } = require("undici-types");

validator.post("/validator",[
    // adding the body items conditions(VALIDATION RULES)
    body("name","enter valid name").isLength({min:3}),
    body("email","enter perfect email").isEmail(),
    body("password","enter better password").isLength({min:6})
],(req,res)=>{
    // allotting the items to the body if no error
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error :errors.array()});
    };
    Users.create({
        text : req.body.text,
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    }).catch(err => console.log(err));
    res.json(req.body)
    
 
// or other way is directly implementing this
    // console.log(req.body);
    // const data = Users(req.body);
    // data.save();

})

module.exports = validator;