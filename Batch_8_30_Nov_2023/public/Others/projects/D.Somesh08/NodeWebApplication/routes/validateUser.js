var express = require('express');
var router = express.Router();

router.get('/', (req, resp) => {
    //if client sends data using get(), data comes in *query params(i.e., URL).
    //we can fetch that data at server side using *req.query
    console.log(req.query);

    var userData = { msg: 'success' }
    resp.send(JSON.stringify(userData));
});

router.post('/', (req, resp) => {
    //if client sends data using post(), data comes in *req.body
    console.log(req.body);

    var responseObj = {};
console.log(req.body.userCredentials)
console.log(req.body.userCredentials.username)
    if(req.body.userCredentials.username=='test' && req.body.userCredentials.password=='h123'){
        responseObj.message = 'Login successFul';
    } else{
        responseObj.message = 'Oops!, Invalid credentials, please try again!';
    }

    resp.send(JSON.stringify(responseObj));
});

module.exports = router;