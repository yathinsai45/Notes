const express = require("express");
const app = express();
const connectToMongo = require("./db");
const { json } = require("body-parser");
connectToMongo();
const port = 5000;
const cors = require('cors')

app.use(cors());
app.use(express.json());
app.use("/routing",require("./routing/base"));
app.use("/routing/express",require("./routing/express-validator"));
app.use("/routing/express",require("./routing/condition_seperate"));
app.use("/routing/express",require("./routing/betterway"));
app.use("/routing/express",require("./routing/bscrypt"));
app.use("/routing/express",require("./routing/login"));
app.use("/routing/express",require("./routing/notes_add"));
app.use("/routing/express",require("./routing/notes_get"));


app.get("/",(req,res)=>{
    res.send("hello using mongodb");
});

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})