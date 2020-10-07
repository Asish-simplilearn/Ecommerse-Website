var express=require("express");

var router=express.Router();

var useController=require("../controllers/userController");
router.post("/",useController.checkUser);

module.exports=router;