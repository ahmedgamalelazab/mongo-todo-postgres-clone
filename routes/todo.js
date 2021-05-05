const router = require("express").Router();
const {createTodo , deleteTodo , getTodo , truncateTodo , updateTodo} = require("../controllers/todo");
const {auth} = require("../middleware/auth");

 
//TODO HANDLE  get todo request 

router.route("/getTodo").get(auth,getTodo);

//TODO HANDLE  create todo request 

router.route("/createTodo").post(auth,createTodo);

//TODO HANDLE  update todo request 

router.route("/updateTodo/:id").put(auth,updateTodo);

//TODO HANDLE  delete request 

router.route("/deleteTodo/:id").delete(auth,deleteTodo);

//TODO HANDLE  truncate request 

router.route("/truncateTodo").delete(auth,truncateTodo);



module.exports = router;






