var express = require('express');
var router = express.Router();

/* login user credentials */
/*router.get('/', function(req, res, next) {
    //get req.query
    console.log(req.query);
  var responsedata = {mag :'success'};
  res.send(JSON.stringify(responsedata));
});*/
router.post('/',function(req,res,next){
    //post req.body
    console.log(req.body);
    var responsedata = {};
    
    if(req.body.accountid == "jyothi_test" && req.body.password == "123456"){
        responsedata.msg = 'valid';
    }else{
        responsedata.msg = 'invalid';
    }
    res.send(JSON.stringify(responsedata));

})

module.exports = router;