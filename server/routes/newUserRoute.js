var express=require('express');

var router=express.Router();

var newUserController=require('../controllers/newUserController');
router.post("/",newUserController.addUser);

module.exports=router;