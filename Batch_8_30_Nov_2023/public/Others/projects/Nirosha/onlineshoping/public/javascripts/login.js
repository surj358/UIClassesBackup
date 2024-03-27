
var checkRememberCheckbox = (userInfo) => {
    if ($("#rememberCheckbox")[0].checked) {
        localStorage.setItem("userLoginInfo", JSON.stringify(userInfo));
        sessionStorage.setItem("userLoginInfo", JSON.stringify(userInfo));
    } else {
        localStorage.removeItem("userLoginInfo");
        sessionStorage.removeItem("userLoginInfo");
    }
}

var validateUserCredentials = () => {
    var userInfo = {};
    userInfo.accountId = $("#userId").val();
    userInfo.accountPwd = $("#accountPwd").val();
    
    // axios.get('/validate/userCredentials', {params: userInfo}).then((response) => {
    //     console.log("response")
    //     console.log(response)
    // })

    checkRememberCheckbox(userInfo);

    axios.post('/validate/userCredentials', userInfo).then((response) => {
        console.log("POST response")
        console.log(response);
        if (response.data.msg == 'Valid') {
            $(".logoutText").show(100);
            $(".loginText").hide(100);
            loadSelectedTemplate('pDetails');
        } else if(response.data.msg == 'DBIssue') {
            $(".responseMsgBlock").show();
            $(".responseMsgBlock").text('DB Issue ... Please try Again After Checks');
        
        } else {
            $(".responseMsgBlock").show();
            $(".responseMsgBlock").text('Invalid Credentails...');
        }
    })

    console.log(userInfo);
}
