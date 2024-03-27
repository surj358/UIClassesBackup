
var validateUserCredentials = () => {
    storeUserPreferences(); // Storing user data to cache.

    var userName = document.querySelector('#floatingInput');
    var userPassword = document.querySelector('#floatingPassword');

    var userCredentials = {};
    userCredentials.username = userName.value;
    userCredentials.password = userPassword.value;

    axios.post('/get/userData', { userCredentials })
        .then((resp) => {
            var respMsgBlock = document.querySelector('.responseMessageBlock');
            respMsgBlock.innerText = resp.data.message;
            if (resp.data.message === 'Login successFul') {
                $('#LoginPage').modal('hide');
                $("#metaContentBlock").hide();
                loadSelectedPage('loadProductDetails');
            }
        }).catch((err) => {
            console.log('error while getting data from server')
        })
}