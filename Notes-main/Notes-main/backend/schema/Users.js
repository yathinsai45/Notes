const mongoose = require("mongoose");
// const { type } = require("os");
// const { emit } = require("process");
const {Schema} = mongoose;

const UserSchema = new Schema({
    text:{
        type: String,
    },
    name:{
        type: String,
        required : true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String,
        required : true
    },
    date:{
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model("user",UserSchema)



// Create the model
// const User = mongoose.model("user", UserSchema);

// Insert a test document (inside an async function)
// const insertDummyUser = async () => {
//     try {
//         const dummyUser = new User({
//             text: "Test User Text",
//             name: "John Doe",
//             email: "john@example.com",
//             password: "123456"
//         });

//         await dummyUser.save();
//         console.log("Dummy user inserted successfully");
//     } catch (err) {
//         console.error("Insertion failed:", err.message);
//     }
// };

// module.exports = { User, insertDummyUser };