const express = require("express");
// const { ModifiedPathsSnapshot } = require("mongoose");
const Users = require("../schema/Users");
const cond = express.Router();
const {body,validationResult} = require("express-validator")

const validationRules = [
    body("name","enter valid name").isLength({min : 3}).notEmpty(),
    body("email","enter perfect email").isEmail().exists(),
    body("password","enter better password").isLength({min:6}).exists()
]

const checkOfErrors = (req,res,next)=>{
    const errors = validationResult(req.body);
    if(!errors.isEmpty()){
// here res.json or res.send donot works because "when the server in an express.js application sends more than one response for a single request"
        // res.status(400);
        console.log("error found");
    }
    next();  // one of the middleWare such that if this function completes then only it goes to another
}

cond.post("/condition",validationRules,checkOfErrors,(req,res,next)=>{
    Users.create({
        text : req.body.text,
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    }).catch(err => res.json(err));
    res.json(req.body);
})

module.exports = cond;
