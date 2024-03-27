
var registerUser = () => {
    var userDetails = {};
    userDetails.accountId = $("#userId").val();
    userDetails.accountPassword = $("#accountPwd").val();
    userDetails.accountMailId = $("#accountMailId").val();

    axios.post('/newUserSignup', userDetails).then((response) => {
        console.log("response");
        console.log(response)
        if (response.data.msg == 'Success') {
            $(".signupStatus").text("User got registered Successfly");
            $(".signupStatus").show(500);
        }
    }).catch((error) => {

    })
}