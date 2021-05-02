const router = require("express").Router();
const {createTodo , deleteTodo , getTodo , truncateTodo , updateTodo} = require("../controllers/todo");



//TODO HANDLE  get todo request 

router.route("/getTodo").get(getTodo);

//TODO HANDLE  create todo request 

router.route("/createTodo").post(createTodo);

//TODO HANDLE  update todo request 

router.route("/updateTodo").put(updateTodo);

//TODO HANDLE  delete request 

router.route("deleteTodo/:id").delete(deleteTodo);

//TODO HANDLE  truncate request 

router.route("truncateTodo").delete(truncateTodo);



module.exports = router;






