//this module should support the jsonwebtoken 
const jwt = require("jsonwebtoken");


const genJsonWebToken = function(user){
    const userId = user._id; 
    const token = jwt.sign({_id : userId},process.env.USER_SECRET,{expiresIn : process.env.USER_TOKEN_EXPIRES});
    return token;
}

module.exports = genJsonWebToken;