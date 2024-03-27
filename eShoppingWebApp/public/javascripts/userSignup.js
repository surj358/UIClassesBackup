

var userDetails = {};

var getUserSignup = () => {
    userDetails.accountId = $("#accountId").val();
    userDetails.password = $("#password").val();
    userDetails.mailId = $("#userMailid").val();

    console.log("userDetails")
    console.log(userDetails)

    axios.post('/signup/newUser', userDetails).then((response) => {
        console.log("response")
        console.log(response);
    }).catch((error) => {

    })
}