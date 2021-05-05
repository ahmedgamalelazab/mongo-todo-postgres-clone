//here will be the model of todo 
const mongoose = require("mongoose");


//TODO todo schema 


const TodoSchema = new mongoose.Schema({
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        required : [true , "user_id missing"],
        ref : "users"
    },
    description : {
        type : mongoose.Schema.Types.String,
        minLength : 5,
        maxLength : 150
    }
})






//TODO to do model that will be used in the collection 

const Todo = mongoose.model('todo',TodoSchema);


module.exports = Todo;