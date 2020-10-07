var express=require('express');
var router=express.Router();

var ShirtController=require("../controllers/allShirtController");
router.get("/",ShirtController.getAllShirts);

module.exports=router;


