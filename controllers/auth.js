// auth will be added here 
const {User , UserSchema , valid} = require("../models/user");


//
exports.register = async (req , res , next)=>{
    
    res.send("hello from registration request ");
}

//
exports.verifyUser = async (req , res , next)=>{

    res.send("hello from verifying user request ");
}

//
exports.login = async (req , res , next)=>{

    res.send("hello from login request ");
}

//
exports.forgetPassword = async (req , res , next)=>{

    res.send("hello from forget Password request ");
}


//
exports.resetPassword = async (req , res , next)=>{

    res.send("hello from reset password request ");
}