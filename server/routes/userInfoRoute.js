var express=require('express');
var router=express.Router();

var UserInfoController=require("../controllers/userInfoController");
router.post("/userData",UserInfoController.userData);
router.post("/updateUserData",UserInfoController.updateUserData);
router.post("/complaint",UserInfoController.complaint);
module.exports=router;





