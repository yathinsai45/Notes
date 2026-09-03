// login means , account or user was already created;

const express = require("express");
const login = express.Router();
const bcrypt = require("bcryptjs");

const Users = require("../schema/Users");
const { body, validation, validationResult } = require("express-validator");

login.post("/login", [
    body("email", "enter valid email first").isEmail(),
    body("password", "enter valid password first").isLength({ min: 6 })
], async (req, res) => {
    try {
        const errors = validationResult(req);

        // checking if any above validation_rules are neglected
        if (!errors.isEmpty()) {
            return res.status(200).json({ errors: errors.array() });
        }

        // checking whether the login in person entered email exists in the database or not
        const loginEmail = req.body.email;
        const there = await Users.findOne({ email: loginEmail });
        if (!there) {
            return res.json({ message: "enter your correct email" });
        }

        // checking the correct normal password
        const loginPassword = req.body.password;
        // const normalPassword = await there.password;
        // if(loginPassword !== normalPassword){
        //     return res.status(200).json({message : "enter correct password to login your password"})
        // }

        // checking the correct email password(hashed one)
        const correctpassword = await bcrypt.compare(loginPassword, there.password);
        if (!correctpassword) {
            return res.status(200).json({ message: "enter correct password to login your account" });
        }

        // if all details are correct
        // res.json({ hurray: "you login to your account" });
        res.json({there});
        console.log(there.id);
    } catch {
        res.status(500).send("some other error");
    }

})

module.exports = login;

