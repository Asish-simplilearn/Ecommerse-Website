var express=require('express');
var router=express.Router();

var ShirtController=require("../controllers/cartController");
router.post("/addShirt",ShirtController.addShirt);
router.post("/getCartItems",ShirtController.getCartItems);
router.post("/removerCartItem",ShirtController.removerCartItem);
router.post("/removeAllCartItems",ShirtController.removeAllCartItems);
module.exports=router;





