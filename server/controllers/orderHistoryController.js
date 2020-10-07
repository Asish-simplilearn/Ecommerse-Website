
var mongoClient = require("mongodb").MongoClient;
var mongoUrl = "mongodb://localhost:27017/";
function getOrderHistory(req, res) {
    mongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, dbHost) => {
        if (err) {
            res.status(500);
            res.json({ message: "Not able to connect to the server" });
        }
        else {
            var db = dbHost.db("slDbEcommerse");
            db.collection("orderHistory", (err, coll) => {
                if (err) {
                    res.status(500);
                    res.json({ message: "Not able to connect to the collections" });
                }
                else {
                    var detail = req.body;
                    console.log(6);
                    console.log(detail);
                    coll.find({}, { details: { $elemMatch: { username: detail.username } } }).toArray((err, result) => {
                        if (err) {
                            res.status(500);
                            res.json({ message: err });
                        }
                        else {
                            if (result) {
                                console.log(result);
                                res.status(200);
                                res.json(result);
                            }
                            else {
                                res.status(201);
                                res.json({ message: "no History" });
                            }
                        }
                    })
                }
            })
        }
    })
}


function updateOrderHistory(req, res) {
    mongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, dbHost) => {
        if (err) {
            res.status(500);
            res.json({ message: "Not able to connect to the server" });
        }
        else {
            var db = dbHost.db("slDbEcommerse");
            db.collection("orderHistory", (err, coll) => {
                if (err) {
                    res.status(500);
                    res.json({ message: "Not able to connect to the collections" });
                }
                else {
                    var details = req.body;
                    console.log(details);
                    coll.findOne({ username: details.username }, (err, result) => {
                        if (err) {
                            res.status(500);
                            res.json({ message: err });
                        }
                        else {
                            coll.insertOne({ details });
                        }
                    })
                }
            })
        }
    })
}
module.exports = { getOrderHistory, updateOrderHistory };