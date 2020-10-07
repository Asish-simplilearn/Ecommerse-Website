var mongoClient = require("mongodb").MongoClient;
var mongoUrl = "mongodb://localhost:27017/";
function userData(req, res) {
    mongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, dbHost) => {
        if (err) {
            res.status(500);
            res.json({ message: "Not able to connect to the server" });
        }
        else {
            var db = dbHost.db("slDbEcommerse");
            db.collection("userInfoData", (err, coll) => {
                if (err) {
                    res.status(500);
                    res.json({ message: "Not able to connect to the collections" });
                }
                else {
                    var user = req.body;
                    coll.findOne({ username: user.username }, (err, result) => {
                        if (err) {
                            res.status(500);
                            res.json({ message: err });
                        }
                        else {

                            if (result) {
                                console.log(200);
                                console.log(result);
                                res.status(200);
                                res.json(result);
                            }
                            else {
                                res.status(201);
                                res.json({ message: "no data yet" });
                            }
                        }
                    })
                }
            })
        }
    })
}

function updateUserData(req, res) {
    mongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, dbHost) => {
        if (err) {
            res.status(500);
            res.json({ message: "Not able to connect to the server" });
        }
        else {
            var db = dbHost.db("slDbEcommerse");
            db.collection("userInfoData", (err, coll) => {
                if (err) {
                    res.status(500);
                    res.json({ message: "Not able to connect to the collections" });
                }
                else {
                    var user = req.body;
                    console.log(req.body);
                    var updateField = req.body.updateField;

                    var rest = { Name: "", Address: "", PhoneNo: "" };
                    if (updateField == "Name")
                        rest.Name = req.body.userdata;
                    if (updateField == "Address")
                        rest.Address = req.body.userdata;
                    if (updateField == "PhoneNo")
                        rest.PhoneNo = req.body.userdata;
                    console.log(rest);
                    coll.findOne({ username: user.username }, (err, result) => {
                        if (err) {
                            res.status(500);
                            res.json({ message: err });
                        }
                        else {
                            console.log(222);
                            console.log(result);
                            if (result) {
                                console.log(600);
                                console.log(result);
                                res.status(200);
                                if (updateField == "Name")
                                    result.userInfo.Name = req.body.userdata;
                                if (updateField == "Address")
                                    result.userInfo.Address = req.body.userdata;
                                if (updateField == "PhoneNo")
                                    result.userInfo.PhoneNo = req.body.userdata;

                                coll.updateOne({ username: user.username }, { $set: { userInfo: result.userInfo } });
                                res.json({ message: "added" });
                            }
                            else {
                                console.log(6000);
                                console.log(updateField);
                                res.status(201);
                                console.log(rest);
                                coll.insertOne({ username: user.username, userInfo: rest });
                                res.json({ message: "updated" });
                            }
                        }
                    })

                }
            })
        }
    })
}

function complaint(req, res) {
    mongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, dbHost) => {
        if (err) {
            res.status(500);
            res.json({ message: "Not able to connect to the server" });
        }
        else {
            var db = dbHost.db("slDbEcommerse");
            db.collection("Complaints", (err, coll) => {
                if (err) {
                    res.status(500);
                    res.json({ message: "Not able to connect to the collections" });
                }
                else {
                    console.log(10000);
                    console.log(req.body);
                    var user = req.body;
                    coll.insertOne(req.body, (err, result) => {
                        if (err) {
                            res.status(500);
                            res.json({ message: err });
                        }
                        else {
                            res.status(200);
                            res.json({ message: true });
                        }
                    })
                }
            })
        }
    })
}
module.exports = { userData, complaint, updateUserData };