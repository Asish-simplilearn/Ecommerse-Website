var mongoClient=require("mongodb").MongoClient;
var mongoUrl="mongodb://localhost:27017/";
function checkUser(req,res)
{
   mongoClient.connect(mongoUrl,{useUnifiedTopology:true},(err,dbHost)=>{
       if(err)
       {
           res.status(500);
           res.json({message: "Not able to connect to the server"});
       }
       else{
           var db=dbHost.db("slDbEcommerse");
           db.collection("users",(err,coll)=>{
               if(err)
               {
                    res.status(500);
                    res.json({message:"Not able to connect to the collections"});
               }
               else{
                   var userToBeChecked=req.body;
                   coll.findOne({userName:userToBeChecked.userName,password:userToBeChecked.password},(err,result)=>{
                       if(err)
                       {
                           res.status(500);
                           res.json({message:err});
                       }
                       else{

                        if(result)
                        {
                           res.status(200);
                           res.json({message:true});
                        }
                        else{
                            res.status(201);
                            res.json({message:false});
                        }
                       }
                   })
               }
           })
       }
   })
}

module.exports={checkUser};