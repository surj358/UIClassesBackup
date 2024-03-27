var validateCredentials = () =>{
    validateCaptcha();
    var validate = {};
    validate.accountid = $('#username').val();
    validate.password = $('#password').val();
    console.log(validate);
    /*axios.get('/validate/login/credentials',{params:validate}).then(response =>{
        console.log('sucess');
      
    }).catch(() =>{
        console.log('Error');
    })*/
    axios.post('/validate/login/credentials',validate).then((response) =>{
    console.log('success');
    
    if(response.data.msg == 'valid'){
        $('#pageLoginModel').modal('hide');
        $(".metaContentBlock").hide();
        onSelectedContent('productDetails');
    }else{
        $('.invalidmsgblock').show();
        $('.invalidmsgblock').text('inavalid credentials ,please try again');
    }
    }).catch(() =>{
        console.log('error')
    });
}