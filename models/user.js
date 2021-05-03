const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");
/**
 * TODO 
 * USER schema should contain this attributes :
 * user should have userName 
 * user should have userEmail
 * user should have userPassword 
 * userEmail should match the example@exmaple.com
 * userPassword should contain one capital char , small one and special char 
 * user userName should be at least 5 chars and maximum 50 chars 
 * userPassword should be at least 8 chars and maximum 150 chars at the backend level and frontend level should be at maximum 15 chars 
 * user in mongoose could contain methods and middleware 
 * user should have a middleware pre save to crypt the userPassword before send it to the data base 
 * user should have a method to generate a JSONWEBTOKEN & VERIFY TOKEN & FORGET PASSWORD TOKEN 
 */

const UserSchema = new mongoose.Schema({
    userName : {
        required : [true , "Pleas provide a userName"],
        type : mongoose.Schema.Types.String,
        minLength : 5,
        maxLength : 50,
    },
    userEmail : {
        required : [true , "Pleas provide a useEmail field"],
        type : mongoose.Schema.Types.String,
        match : [/^(?!.*[\^|+|=|&|}|%|$|#|!|~])(?!^[-])(?!^[_])([a-zA-Z_-]+([0-9]?)+@+[a-zA-z0-9]+\.+com)$/ , "Pleas enter a valid email"],
    },
    userPassword : {
        required : true,
        type : mongoose.Schema.Types.String,
        match : [/(?=.*[*$#@!=])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+/ , "pleas include in your password capital char , small one and at least one of this chars [*$#@!=]]"],
        minLength : 8,
        maxLength : 150
    }
})

//validation schema 
//this validation will be so useful when we get the job in the frontEnd side 
//on the data base layer we said that we need at max password to be 150 chars but this is not allowed from the uer input so that's why we added joi validation 
const validUserInput = function(userFormInfo){
    const validSchema = Joi.object({
        userName : Joi.string().min(5).max(50).required(),
        userEmail : Joi.string().pattern(/^(?!.*[\^|+|=|&|}|%|$|#|!|~])(?!^[-])(?!^[_])([a-zA-Z_-]+([0-9]?)+@+[a-zA-z0-9]+\.+com)$/),
        userPassword : Joi.string().min(8).max(18).pattern(/(?=.*[*$#@!=])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+/)
    });

    const valid = validSchema.validate(userFormInfo);
    return valid;
}

//middleware crypt userPassword pre save to data bse 
UserSchema.pre("save",async function(next){
    if(!this.isModified('userPassword')){
        next();
    }
    //crypt userPassword
    const salt = await bcrypt.genSalt(10);
    this.userPassword = await bcrypt.hash(this.userPassword , salt);
    next();
})


//provide a model 

const User = mongoose.model('users',UserSchema);


module.exports = {
    User : User ,
    UserSchema : UserSchema,
    valid : validUserInput
}
