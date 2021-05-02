const mongoose = require("mongoose");

const dbConnect = async function(){
    try{
        await mongoose.connect(process.env.MONGOOSE_URI , {
            useNewUrlParser : true,
            useUnifiedTopology : true,
            useCreateIndex : true,
            useFindAndModify : true,
        });

        //if all ok 

        console.log("connected successfully to mongoose db !");

    }catch(error){
        console.log("error while connecting to mongoose db !");
    }
}

module.exports = dbConnect;