var validateUSerCredentails = () => {
    storeUserCredentials(); // Storing user data to cache.
    var userData = {};
    userData.accountId = $("#userAccountId").val();
    userData.password = $("#accountPwd").val();

    /*axios.get('/validate/userLogin', {params: userData}).then(response => {
        console.log("success");
    }).catch(() => {
        console.log("Error");
    }) */

    axios.post('/validate/userLogin', userData).then(response => {
        console.log("success");
        if (response.data.msg == 'Valid') {
            $('#pageLoginModel').modal('hide');
            $(".metaContentBlock").hide();
            loadSelectedPage('productList')
        } else {
            $(".invalidMsgBlock").show();
            $(".invalidMsgBlock").text("Invalid Credentials, please try again");
        }
    }).catch(() => {
        console.log("Error");
    }) 


    console.log(userData)
}