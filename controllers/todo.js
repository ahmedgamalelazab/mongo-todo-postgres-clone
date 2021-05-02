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

    try{

        const todo = await Todo.find({});
        // if all are ok ! 
        res.status(200).json({
            success : true,
            data : todo
        });

    }catch(error){
        return res.status(500).json({ message: 'SERVER ERROR' });

    }
}

//TODO HANDLE  update todo REQUEST 

exports.updateTodo = async function(req , res , next){

    const {id} = req.params;
    const {description} = req.body;

    if(!id || ! description){
        return res.status(400).json({ message: 'BAD REQUEST' });
    }

    try{

        const update = await Todo.updateOne({
            _id : id 
        },{$set :{
            description : description
        }})

        //if update success 
        //get the object to send it again to the client

        const todo = await Todo.find({_id  : id});

        //if all ok 


        res.status(201).json({
            success : true,
            updateStatus : update,
            data : todo
        })

    }catch(error){
        return res.status(500).json({ message: 'SERVER ERROR' });
    }


}


//TODO HANDLE  delete  REQUEST 

exports.deleteTodo = async function(req , res , next){

    //expected to have in the params id 

    const {id}= req.params;

    if(!id){
        return res.status(400).json({ message: 'BAD REQUEST' });
    }

    try {
        const todo = await Todo.find({_id : id});
        if(!todo) return res.status(404).json({ message: 'Not found' });
        //if found 
        const removeOne = await Todo.deleteOne({_id : id});
        // if removed 
        res.status(201).json({
            success : true,
            deletionStatus : removeOne,
            dataDeleted : todo
        })
    } catch (error) {
        return res.status(500).json({ message: 'SERVER ERROR' });
    }

}

//TODO HANDLE  truncate  REQUEST 

exports.truncateTodo = async function(req , res , next){
    
    try {
        const todo = await Todo.find({});
        
        if(!todo) return res.status(404).json({ message: 'no objects found' });
        
        //if data found 

        const removeAll = await Todo.remove({});

        res.status(201).json({
            success : true,
            deleteInfo : removeAll,
            dataRemoved : todo 
        })

    } catch (error) {
        return res.status(500).json({ message: 'SERVER ERROR' });
    }
    
}