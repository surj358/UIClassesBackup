var express = require('express');
var router = express.Router();
var mongoClient = require("./common").dbConDetails.mongoClient;


/* GET home page. */
router.get('/', function(req, res, next) {
    var productDetails  = []
    getDBConnection().then((response) => {
        res.send(JSON.stringify({details: response}));
    })
  
});

async function getDBConnection(userData) {
    
    await mongoClient.connect();
    var db = mongoClient.db("shoppingWebApp");
    var collection = db.collection("productDetails");
    return collection.find({}).toArray();
    
}

module.exports = router;
