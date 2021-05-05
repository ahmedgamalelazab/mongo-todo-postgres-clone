//this file here will be filled with function to crypt the password for the registered user 
const bcrypt = require("bcrypt");


const cryptPassword = async function(userPassword){

    const salt = await bcrypt.genSalt(10);

    const cryptUserPassword = await bcrypt.hash(userPassword , salt);

    return cryptUserPassword;


}


module.exports = cryptPassword;