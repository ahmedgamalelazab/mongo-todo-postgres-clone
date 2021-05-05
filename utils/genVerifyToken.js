const crypto = require("crypto");
//TODO create a verify token to user 
//verify token should support a decoded token to the user in the url param and an encoded toke to the data base 
//verify token expires only for moderator when he gonna check for fake users that didn't verify their accounts 


const genVerifyTokenPackage =  function(){

    const urlDecodedVerifyToken = crypto.randomBytes(15).toString("hex");

    const databaseEncodedVerifyToken = crypto.createHash("sha256").update(urlDecodedVerifyToken).digest("hex");

    const verifyTokenExpires = Date.now() + 25 * (60 * 1000); // 25 minutes of validation 

    return [urlDecodedVerifyToken , databaseEncodedVerifyToken , verifyTokenExpires];

}


module.exports = genVerifyTokenPackage;