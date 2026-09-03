const express = require("express");
const Users = require("../schema/Users");
const route = express.Router();

//before using express validator

route.post("/base",(req,res)=>{
// if we have password then it is better to use post mode;
    const data = Users(req.body);
    data.save();
    res.json(req.body);
});

module.exports = route;