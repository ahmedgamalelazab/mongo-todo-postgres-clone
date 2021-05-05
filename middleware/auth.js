//TODO create the auth middleware to protect the todo publish , should be verified and signed in as valid user 
const {User} = require("../models/user");
const jwt = require("jsonwebtoken");

exports.auth = async(req, res , next)=>{


    const token = req.headers["x-auth-token"];

    if(!token){
        return res.status(400).json({ success:false, message : "BAD REQUEST" });
    }

    //if token then valid it using th users secret 

    try{
        const decodedToken = jwt.verify(token , process.env.USER_SECRET);

        // if decodedToken 

        const user = await User.findOne({_id : decodedToken._id});
        if(!user){
            return res.status(400).json({ message: 'Invalid Token' });
        }
        //if user 
        if(!user.isVerified){
            return res.status(400).json({ message: 'Pleas verify your account then try to login !' });
        }
        //if verified and valid token then he can use the todo service 
        req.user = user; //load the req with user 
        next();

    }catch(error){
        return res.status(400).json({ message: 'INVALID TOKEN' });

    }


}