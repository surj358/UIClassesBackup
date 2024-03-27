var onSelectedContent = (type) =>{
var templateUrl = '' ;
switch (type){
    case 'signUp':
        templateUrl = 'templates/SignUp.htm';
        break;
        case 'home':
            
            $('#openeye').show();
            $('#closedeye').hide();
           
            $('#mainContentBlockArea').html('');
        break;
        case 'forgotpwd':
            templateUrl = 'templates/forgotpwd.htm';
            break;
            case 'productDetails':
                templateUrl = 'templates/productDetailsPage.htm';
                break;
}
axios.get(templateUrl).then((response)=>{
    if(type == 'signUp'){
        $('#mainContentBlockArea').html(response.data);
    }else if(type == 'forgotpwd'){
        $('#pageLoginModel').modal('hide');
        $("#mainContentBlockArea").html(response.data);
    }else if (type == 'productDetails') {
        $("#mainContentBlockArea").html(response.data);
        loadProductDetails();
    }
})
}
var validateCaptcha = () => {
    errCaptcha = document.getElementById("errCaptcha");
    inputText = document.querySelector('#reCaptcha').value;
    let validateCaptcha = 0;
    for(var i = 0; i < 5;i++){
        if(inputText.charAt(i) != ctext[i]){
            validateCaptcha++;
        }else{
            console.log(inputText[i]);
        }
    }
    if (inputText == "") {
        errCaptcha.innerHTML = "Captcha must be filled";
        errCaptcha.style.color = 'red';
      }else if (validateCaptcha > 0 || inputText.length > 5) {
        errCaptcha.innerHTML = "Wrong captcha";
        errCaptcha.style.color = 'orange';
      }
}
    document.addEventListener('DOMContentLoaded',()=>{
    document.querySelector('#refresh').addEventListener('click',()=>{
    getcpatcha();
    document.getElementById("errCaptcha").innerText= '';
    document.querySelector('#reCaptcha').value = '';
})
})
var getImageOfCanvas = () => {
    var imageurl = document.querySelector(".canvasblock").toDataURL();
    console.log(imageurl);
}  
getImageOfCanvas(); 

