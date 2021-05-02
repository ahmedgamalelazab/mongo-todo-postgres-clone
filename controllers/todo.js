//CRUD operations 

//TODO HANDLE  create todo  REQUEST 

exports.createTodo = async function(req , res , next){

    return res.send("hello from create todo");

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