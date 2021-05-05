//this module should contain function to check user logged or not 
const bcrypt = require("bcrypt");


const checkUser = async function(userPassword , encodedPassword){
    return await bcrypt.compare(userPassword , encodedPassword);
}

module.exports = checkUser;