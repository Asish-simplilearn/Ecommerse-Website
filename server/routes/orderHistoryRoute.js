var express=require('express');
var router=express.Router();

var ShirtController=require("../controllers/orderHistoryController");
console.log(1001);
router.post("/getOrderHistory",ShirtController.getOrderHistory);
router.post("/updateOrderHistory",ShirtController.updateOrderHistory);
module.exports=router;


