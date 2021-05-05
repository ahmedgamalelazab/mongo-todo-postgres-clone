// auth will be added here 
const {User , validLogin , valid} = require("../models/user");
const genVerifyToken = require("../utils/genVerifyToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const userCheck = require("../utils/checkUserLogin");
const genJWToken = require("../utils/genJswtoken");
//
exports.register = async (req , res , next)=>{
    
   const {userName , userEmail, userPassword} = req.body;

   const result = valid(req.body); // validate the user form 

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

    //25 mins until user go verify himself 
    const [a , b , c ] =  genVerifyToken(25);

    //create will save automatic with crypt password 
    user = await User.create({
        userName : userName,
        userEmail : userEmail,
        userPassword : userPassword,
        userVerifyToken : b,
        userVerifyTokenExpires : c
    })

    const verifyUrl = `http://localhost:3000/app/api/todo/mongo/auth/verifyUser/${a}`;

    const text = `
        <h1>Verify Account Request</h1>
        <p1>Pleas follow the link to verify your account in our system<p1>
        <a href =${verifyUrl}>${verifyUrl}</a>
    `;


    try{

        const info = await sendEmail({
            to : user.userEmail,
            subject : `verify user Request`,
            text : text
        });
        
       // if all are ok 

        console.log(info);

        res.status(201).json({
            success : true,
            data : user,
            emailInfo : info,
        })


    }catch(error){
        return res.status(400).json({ message: 'FAILED TO SEND Verify user Email' });
    }


    

   } catch (error) {
        return res.status(500).json({ message: 'SERVER ERROR' , error : error });
   }
   




}

//
exports.verifyUser = async (req , res , next)=>{

    const decodedVerifyToken = req.params.verifyToken;

    const encodedDataBaseToken = crypto.createHash("sha256").update(decodedVerifyToken).digest("hex");

    try{

        let user = await User.findOne({userVerifyToken :encodedDataBaseToken});
    
        if(user.userVerifyTokenExpires > Date.now()){
            
            //that's mean the token still valid 

            user.isVerified = true,
            user.userVerifyToken = undefined;
            user.userVerifyTokenExpires = undefined;
            await user.save();


        }else{
            const deleteUserDueToInvalidToken = await User.deleteOne({userVerifyToken : encodedDataBaseToken });
            return res.status(400).json({ 
                userRemoved : true,
                deleteInfo : deleteUserDueToInvalidToken,
                message: 'VerifyToken not valid try to register again later' 
            });
        }

         

        return res.send("Thanks for Verifying your account enjoy the service !");
        
    }catch(error){

        return res.status(500).json({ message: 'SERVER ERROR' });

    }
   

    
}

//
exports.login = async (req , res , next)=>{

    const {userEmail , userPassword} = req.body;

    const validInfo = validLogin(req.body);

    if(validInfo.error){
        return res.status(400).json({ message: 'INPUT NOT VALID' });
    }

    //check for the user existed in data base or not 

    try{
        let user = await User.findOne({userEmail : userEmail});
       

        if(!user){
            return res.status(400).json({ message: `Invalid userEmail or password` });

        }

        const isMatch = await userCheck(userPassword , user.userPassword);

        if(isMatch){
            if(user.isVerified){
                const token = genJWToken(user);
                return res.json({ success: true,
                    user : user.userName,
                    userEmail : user.userEmail,
                    token : token
                });
            }else{
                return res.status(400).json({ message: 'Pleas verify your account' });
            }
        }else{
            return res.status(400).json({ message: 'Invalid userEmail or password' });
        }

    }catch(error){

        return res.status(500).json({ message: 'SERVER ERROR'});
    }


}

//
exports.forgetPassword = async (req , res , next)=>{

    //if now web developer handling this service i will refine this code to make it fit the mobile request and verifying user will be by sending a secret to his mobile phone and check for this secret 
    const {userEmail} = req.body;

    if(!userEmail){
        return res.status(400).json({ message: 'BAD REQUEST' });
    }

    try {
        const user = await User.findOne({userEmail : userEmail});

        if(!user){
            return res.status(400).json({ message: `this email : ${userEmail} is not registered in the system` });
        }
        //a stands for decoded token (urlToken) , b stands for dataBase token , c tokenExpiresInSeconds
        const [a , b , c ] = genVerifyToken(10);

        user.userResetAccountToken = b;
        user.userResetAccountTokenExpires = c;
        await user.save();

        const resetUrl = `http://localhost:3000/app/api/todo/mongo/auth/resetPassword/${a}`;

        const text = `
        <h1>reset Account Request</h1>
        <p1>Pleas follow the link to reset password<p1>
        <a href =${resetUrl}>${resetUrl}</a>
        `

        try{
            const info = await sendEmail({
                to : user.userEmail,
                subject : `Forget Password request`,
                text : text
            });

            //if all ok ,
            console.log(info);

            return res.json({ success: true,
                emailInfo : info,
            });
        }catch(error){
            res.status(400).json({success : false , message : "failed to send forgetPassword request email"});
        }



    } catch (error) {
        res.status(500).json({success : false , message : "server Error"});
    }

   
}


//
exports.resetPassword = async (req , res , next)=>{

    res.send("hello from reset password request ");
}
