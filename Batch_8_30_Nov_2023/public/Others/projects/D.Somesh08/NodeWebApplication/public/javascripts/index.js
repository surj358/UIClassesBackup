var categoryImages = [
    { imgUrl: 'images/HomeSliderImgs/sliderImg_3.webp' },
    { imgUrl: 'images/HomeSliderImgs/sliderImg_4.webp' },
    { imgUrl: 'images/HomeSliderImgs/sliderImg_2.webp' }
];

var categoryFilterBlockImgs = [
    { imgUrl: './images/CategoryImgs/cat_1.webp' },
    { imgUrl: './images/CategoryImgs/cat_2.webp' },
    { imgUrl: './images/CategoryImgs/cat_3.webp' }
];

document.addEventListener('DOMContentLoaded', () => {
    //Category carousel images dynamci creation.
    var categoryTemp = document.querySelector('#categoryTemplate').innerHTML;
    var temp = Handlebars.compile(categoryTemp);
    var mainCarousel = document.querySelector('.carousel-inner');

    categoryImages.forEach((item, index) => {
        var activeState = index === 0 ? 'active' : '';
        item.active = activeState;
        mainCarousel.insertAdjacentHTML("beforeend", temp(item));
    });

    // Category filter block images dynamic template creation
    var categoryFilterBlockTemp = document.querySelector('#categoryFilterBlockTemplate').innerHTML;
    var catFilTemp = Handlebars.compile(categoryFilterBlockTemp);
    var catImgCols = document.querySelector('#categoryImgColumns');
    categoryFilterBlockImgs.forEach((item1, index1) => {
        catImgCols.insertAdjacentHTML('beforeend', catFilTemp(item1));
    });
});

var showPassword = () => {
    var closedEye = document.querySelector('#closedEye');
    closedEye.style.display = 'inline';
    var openEye = document.querySelector('#openEye');
    openEye.style.display = 'none';
    var passwordType = document.querySelector('#floatingPassword');
    passwordType.setAttribute('type', 'text');
}

var hidePassword = () => {
    var openEye = document.querySelector('#openEye');
    openEye.style.display = 'inline';
    document.querySelector('#closedEye').style.display = 'none';
    var passwordType = document.querySelector('#floatingPassword');
    passwordType.setAttribute('type', 'password');
}

var storeUserPreferences = () => {
    var rememberMe = document.querySelector('#flexCheckChecked');
    if (rememberMe.checked) {
        var userName = document.querySelector('#floatingInput');
        localStorage.setItem('userName', userName.value);

        var password = document.querySelector('#floatingPassword');
        localStorage.setItem('password', password.value);
    } else {
        localStorage.setItem('userName', '');
        localStorage.setItem('password', '');
    }
}

var setUserPreferences = () => {
    if (localStorage.getItem('userName') != null) {
        var userName = document.querySelector('#floatingInput');
        userName.value = localStorage.getItem('userName');
    }
    if (localStorage.getItem('password') != null) {
        var password = document.querySelector('#floatingPassword');
        password.value = localStorage.getItem('password');
    }
}

// Sign-Up related methods
var loadSelectedPage = (type) => {
    var templateUrl = '';
    switch (type) {
        case 'signUp':
            templateUrl = '/Templates/SignUp.htm';
            document.querySelector('#metaContentBlock').style.display = 'none';
            document.querySelector('#SignUpPageTemplate').style.display = 'block';
            break;

        case 'home':
            var signUpPageTemp = document.querySelector('#SignUpPageTemplate');
            signUpPageTemp.innerHTML = '';
            signUpPageTemp.style.display = 'none';
            document.querySelector('#metaContentBlock').style.display = 'block';
            break;

        case 'loadProductDetails':
            templateUrl = '/Templates/ProductDetails.htm';
            break;
    }
    if (templateUrl != '') {
        axios.get(templateUrl)
            .then((response) => {
                if (type == 'signUp') {
                    var signUpPageBlock = document.querySelector('#SignUpPageTemplate');
                    signUpPageBlock.insertAdjacentHTML('afterbegin', response.data);
                }
                else if (type = 'loadProductDetails') {
                    document.querySelector('#metaContentBlock').style.display='none';
                    var mainBlock = document.querySelector('.productDetailsTemp');
                    mainBlock.insertAdjacentHTML('afterend', response.data);
                    loadSingleProductDetailsTemplate();
                }
            }).catch(err => console.log("error : ", err));
    }
}