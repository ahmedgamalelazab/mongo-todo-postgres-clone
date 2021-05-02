//CRUD operations 
const Todo = require("../models/todo");

//TODO HANDLE  create todo  REQUEST 

exports.createTodo = async function(req , res , next){

    const {description} = req.body;

    if(!description) return  res.status(400).json({ message: 'BAD REQUEST' });

    //if description added in the form 

    try{
        
        const todo = await Todo.create({
            description : description
        })

        //if created 
        res.status(201).json({
            success : true,
            data : todo
        });

    }catch(error){
        return res.status(500).json({ message: 'SERVER ERROR' });
    }


}

//TODO HANDLE  read todo REQUEST 

exports.getTodo = async function(req , res , next){

    console.log("hello from get todo ");
    return res.send("hello from get");

}

//TODO HANDLE  update todo REQUEST 

exports.updateTodo = async function(req , res , next){

    console.log("hello from updating todo ");
    return res.send("hello from update todo");
}


//TODO HANDLE  delete  REQUEST 

exports.deleteTodo = async function(req , res , next){

    console.log("hello from deleting todo ");
    return res.send("hello from delete todo");
}

//TODO HANDLE  truncate  REQUEST 

exports.truncateTodo = async function(req , res , next){
    console.log("hello from truncating todo");
    return res.send("hello from truncating todo");
    
}