
var mongoClient = require("mongodb").MongoClient;
var mongoUrl = "mongodb://localhost:27017/";
function addShirt(req, res) {
    mongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, dbHost) => {
        if (err) {
            res.status(500);
            res.json({ message: "Not able to connect to the server" });
        }
        else {
            var db = dbHost.db("slDbEcommerse");
            db.collection("cart", (err, coll) => {
                if (err) {
                    res.status(500);
                    res.json({ message: "Not able to connect to the collections" });
                }
                else {
                    var details = req.body;
                    console.log(5);
                    console.log(details);
                    var Itemid=details.itemdata.ItemNo;
                     
                    console.log(1000);
                    console.log(Itemid);
                    coll.findOne( {username:details.username,itemNo:Itemid }, (err, result) => { //username: details.username,"itemdata.itemNo":Itemid
                        if (err) {
                            res.status(500);
                            res.json({ message: err });
                        }
                        else {
                            console.log(Itemid);
                            console.log(result);
                            if (result) {
                                  result.itemdata.quantity+=details.itemdata.quantity;
                                coll.updateOne({_id:result._id},{$set:{itemdata:result.itemdata}},(err, data) => {
                                    if (err) {
                                        res.status(500);
                                        res.json({ message: err });
                                    }
                                    else {
                                        res.json({ message: "added quantity" });
                                    }
                                });
                            }
                            else {
                                res.status(201);
                                coll.insertOne(details);
                                res.json({ message: true });
                            }
                        }
                    })
                }
            })
        }
    })
}

function getCartItems(req, res) {
    mongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, dbHost) => {
        if (err) {
            res.status(500);
            res.json({ message: "Not able to connect to the server" });
        }
        else {
            var db = dbHost.db("slDbEcommerse");
            db.collection("cart", (err, coll) => {
                if (err) {
                    res.status(500);
                    res.json({ message: "Not able to connect to the collections" });
                }
                else {
                    var details = req.body;
                    console.log(details);
                   
                    coll.find({ username: details.username}).toArray((err, result) => {
                        if (err) {
                            res.status(500);
                            res.json({ message: err });
                        }
                        else {
                            if (result) {
                                console.log(50);
                                console.log(result);
                                res.status(200);
                                res.json(result);
                            }
                            else {
                                res.status(201);
                                res.json({ message: "No Items in Cart" });
                            }
                        }
                    })
                }
            })
        }
    })
}
function removerCartItem(req, res) {
    mongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, dbHost) => {
        if (err) {
            res.status(500);
            res.json({ message: "Not able to connect to the server" });
        }
        else {
            var db = dbHost.db("slDbEcommerse");
            db.collection("cart", (err, coll) => {
                if (err) {
                    res.status(500);
                    res.json({ message: "Not able to connect to the collections" });
                }
                else {
                    var details = req.body;
                    console.log(details);
                    var Itemid=details.itemdata.ItemNo;
                    coll.findOne({ username: details.username}, {itemdata:{$elemMatch:{ItemNo: Itemid}} }, (err, result) => {
                        if (err) {
                            res.status(500);
                            res.json({ message: err });
                        }
                        else {
                            if (result) {
                                console.log(result);
                                res.status(200);
                               coll.deleteOne({ _id:result._id});
                                res.json({message: "Removed the Item"});
                            }
                            else {
                                res.status(201);
                                res.json({ message: "Item Not found problem in Database" });
                            }
                        }
                    })
                }
            })
        }
    })
}
function removeAllCartItems(req, res) {
    mongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, dbHost) => {
        if (err) {
            res.status(500);
            res.json({ message: "Not able to connect to the server" });
        }
        else {
            var db = dbHost.db("slDbEcommerse");
            db.collection("cart", (err, coll) => {
                if (err) {
                    res.status(500);
                    res.json({ message: "Not able to connect to the collections" });
                }
                else {
                    var details = req.body;
                    console.log(details);
                    coll.findOne({ username: details.username  }, (err, result) => {
                        if (err) {
                            res.status(500);
                            res.json({ message: err });
                        }
                        else {
                            if (result) {
                                res.status(200);
                                coll.deleteMany({ username: details.username  });
                                res.json({message: "Removed All Items"});
                            }
                            else {
                                res.status(201);
                                res.json({ message: "No Items in Cart" });
                            }
                        }
                    })
                }
            })
        }
    })
}
module.exports = { addShirt,getCartItems,removeAllCartItems,removerCartItem };