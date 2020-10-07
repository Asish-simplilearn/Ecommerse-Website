var express=require("express");
var app=express();
var bodyParser=require('body-parser');
var path=require('path');
var cors = require('cors');
var userRoute= require('./routes/userRouter');
var newUserRoute=require('./routes/newUserRoute');
var allShirtsRoute=require('./routes/allShirtsRoute');
var cartRoute=require('./routes/cartRoute');
var orderHistoryRoute=require('./routes/orderHistoryRoute');
var userInfoRoute=require('./routes/userInfoRoute')
const PORT=3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.use("/api/login",userRoute);
app.use("/api/register",newUserRoute);
app.use("/api/allshirts",allShirtsRoute);
app.use("/api/cart",cartRoute);
app.use("/api/orderHistory",orderHistoryRoute);
app.use("/api/userInfo",userInfoRoute);
app.listen(PORT,(err)=>{
    if(!err)
    console.log(`server running at${PORT}`)
})


