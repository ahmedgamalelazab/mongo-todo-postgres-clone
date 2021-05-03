// auth will be added here 
const {User , UserSchema , valid} = require("../models/user");


//
exports.register = async (req , res , next)=>{
    
   const {userName , userEmail, userPassword} = req.body;

   const result = valid(req.body);

    //this will be refined later in version 1.1.1
    //should add error recognizer and message to the client
   if(result.error){
        return res.status(400).json({ message: 'input not valid' });
   }

   try {

    let user = await User.findOne({userEmail : userEmail});

    if(user){
         return res.status(400).json({ message: 'this email had registered already !' });
    }

    //if user not registered in the data base now lets add it 

    //create will save automatic with crypt password 
    user = await User.create({
        userName : userName,
        userEmail : userEmail,
        userPassword : userPassword
    })

    // if all are ok 

    res.status(201).json({
        success : true,
        data : user
    })

   } catch (error) {
        return res.status(500).json({ message: 'SERVER ERROR' , error : error });
   }
   




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