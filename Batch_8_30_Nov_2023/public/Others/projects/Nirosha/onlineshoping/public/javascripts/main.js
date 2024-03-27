var capthcaText = '';

var checkLocalAndSessionStorages = () => {
    if (localStorage.getItem("userLoginInfo") != null) {
        var userCredentials = JSON.parse(localStorage.getItem("userLoginInfo"));
        $("#userId").val(userCredentials.accountId);
        $("#accountPwd").val(userCredentials.accountPwd);
        $("#rememberCheckbox")[0].checked = true;
    } else if (sessionStorage.getItem("userLoginInfo") != null) {
        var userCredentials = JSON.parse(sessionStorage.getItem("userLoginInfo"));
        $("#userId").val(userCredentials.accountId);
        $("#accountPwd").val(userCredentials.accountPwd);
        $("#rememberCheckbox")[0].checked = true;
    }
}

var generateCapthca = (captchaPattern) => {
    capthcaText = '';
    $('#userEnterdCaptcha').val('');
    if (!captchaPattern) {
        captchaPattern = getRandomPattern();
    }
    if (captchaPattern) { // LUNLU
        var patternList = captchaPattern.split('');
        for (var i = 0; i < patternList.length; i++) {
            switch (patternList[i]) {
                case 'U':
                    capthcaText += getRandomUpperCaseChar();
                    break;
                case 'L':
                    capthcaText += getRandomLowerCaseChar();
                    break;
                case 'N':
                    capthcaText += getRandomNumber();
                    break;
            }
        }
    } else { // Default UNLUN
        capthcaText = getRandomUpperCaseChar() + getRandomNumber() + getRandomLowerCaseChar() + getRandomUpperCaseChar() + getRandomNumber();
    }
    getImageFromCapchaText(capthcaText);
    checkCaptchaText();
}

/**
 * Method returns random no. betwn 0 to 9
 */
var getRandomNumber = () => {
    var randomNumber = Math.round(Math.random() * 9);
    return randomNumber;
    console.log(randomNumber);
}

/**
 *  Method returns random char between a to z 
 */
var getRandomLowerCaseChar = () => {
    var randomNumber = getRandomNumberBtwnRange(97, 122);
    var char = String.fromCharCode(randomNumber);
    return char;
}

var getRandomSymbol = () => {
    var symbolList = ['&', '$', '#', '@'];

}

/**
 *  Method returns random char between a to z 
 */
var getRandomUpperCaseChar = () => {
    var randomNumber = getRandomNumberBtwnRange(65, 90);
    var char = String.fromCharCode(randomNumber);
    return char;
}


var getRandomNumberBtwnRange = (min, max) => {
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}


var getRandomPattern = () => {
    var randomCaptcha = '';
    var captchaLength = 5;
    var list = ['U', 'L', 'N'];
    for (var i = 0; i < captchaLength; i++) {
        var randomIndex = Math.floor(Math.random() * 3);
        randomCaptcha += list[randomIndex];
    }
    //console.log('randomCaptcha')
    //console.log(randomCaptcha)
    // randomCaptcha = LNULN
    return randomCaptcha;
}

var getImageFromCapchaText = (capthcaText) => {

    document.getElementById("image_X").src = convertTextToImage(capthcaText);
}

var checkCaptchaText = () => {
    var userEnteredCapthcaText = $("#userEnterdCaptcha").val();
    if (userEnteredCapthcaText == capthcaText) {
        $("#loginBtn").removeAttr("disabled");
    } else {
        $("#loginBtn").attr("disabled", 'true')
    }
}

var loadSelectedTemplate = (moduleName, pid) => {
    console.log("frm seleted template")
    var hasTagValue = '';
    var templateUrl = '';
    switch (moduleName) {
        case 'login':
            templateUrl = 'templates/login.htm'
            hasTagValue = '#loginPage';
            break;
        case 'fgpwd':
            templateUrl = 'templates/forgotPwd.htm'
            hasTagValue = '#forgotPwd';
            break;
        case 'newSignup':
            templateUrl = 'templates/newSignup.htm'
            hasTagValue = '#signup';
            break;
        case 'pDetails':
            templateUrl = 'templates/productDetails.htm'
            hasTagValue = '#pDetails';
            break;
        case 'singleProductDetails':
            templateUrl = 'templates/singleDetailedProductDetails.htm'
            hasTagValue = '#singlePDetails?pid=' + pid;
            break;
    }
    addHashTagForUrl(hasTagValue);
    axios.get(templateUrl).then((response) => {
        $("main").html(response.data);

        if (moduleName == 'login') {
            generateCapthca();
            checkLocalAndSessionStorages();
        }

        if (moduleName == 'pDetails') {
            loadProductDataToPage();
        } else if (moduleName == 'singleProductDetails') {
            loadSingleProductData();
        }
    })
}

var addHashTagForUrl = (hasTagValue) => {
    var url = window.location.href.replace(/#.*/, '');
    url = url + hasTagValue;
    window.location.href = url;
}


axios.get("/check/validateSessin").then((response) => {
    console.log("response");
    console.log(response);
    if (response.data.isValidSession) {
        // load selectd page
        console.log(window.location);
        if (window.location.hash == '#pDetails') {
            loadSelectedTemplate('pDetails');
        } else if (window.location.hash.match(/^#singlePDetails/)) {
            // load singel product detail spage
            var pid = window.location.hash.replace(/.*?=/, '');
            console.log(pid);
            loadSelectedTemplate('singleProductDetails', pid);
        } else {
            loadSelectedTemplate('login');    
        }
    } else {
        loadSelectedTemplate('login');
    }
}).catch().finally();


var updateSession = (type) => {
    if (type == 'login') {

    } else { // logout
        // invalidate the session
        axios.post("/logoutSession").then(() => {
            loadSelectedTemplate('login');
            $(".logoutText").hide(100);
            $(".loginText").show(100);
        })
        
    }
}

// loadSelectedTemplate('pDetails');