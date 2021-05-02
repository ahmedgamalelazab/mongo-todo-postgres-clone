const router = require("express").Router();
const {register , login , verifyUser , forgetPassword , resetPassword} = require("../controllers/auth");



//TODO HANDLE  REQUEST

router.route("/register").post(register);


//TODO HANDLE  REQUEST

router.route("/verifyUser/:verifyToken").get(verifyUser);



//TODO HANDLE  REQUEST

router.route("/login").post(login);



//TODO HANDLE  REQUEST

router.route("/forgetPassword").post(forgetPassword);



//TODO HANDLE  REQUEST

router.route("/resetPassword/:resetToken").put(resetPassword);




module.exports = router;