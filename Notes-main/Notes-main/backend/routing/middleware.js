const fetchUser = (req,res,next)=>{
    const id= req.header("id");
    if(!id){
        res.status(401).send({error : "please enter valid id in header"});
    }
    const reqId= id;
    next();
}

module.exports = fetchUser;