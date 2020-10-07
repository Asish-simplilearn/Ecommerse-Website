
var mongoClient = require("mongodb").MongoClient;
var mongoUrl = "mongodb://localhost:27017/";
function getAllShirts(req, res) {
    mongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, dbHost) => {
        if (err) {
            res.status(500);
            res.json({ message: "Not able to connect to the server" });
        }
        else {
            var db = dbHost.db("slDbEcommerse");
            db.collection("shirts", (err, coll) => {
                if (err) {
                    res.status(500);
                    res.json({ message: "Not able to connect to the collections" });
                }
                else {
                    coll.find({}).toArray((err,data)=>{
                        if(err)
                        {
                            res.status(500);
                            res.json({message:"Error connecting to the mongodb server"});
                        }
                        else
                        {
                           // coll.insertOne({brand:"puma"});
                            console.log("All shirts -",data);
                            res.json(data);
                        }
                    })
                }
            })
        }
    })
}

module.exports = { getAllShirts };