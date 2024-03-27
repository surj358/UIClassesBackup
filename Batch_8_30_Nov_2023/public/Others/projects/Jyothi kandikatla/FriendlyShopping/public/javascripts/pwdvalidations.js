var changeTheType = () => {
    var pwdElement = document.querySelector("#password");
    var currentType = pwdElement.getAttribute('type');
    if (currentType == 'password') {
        pwdElement.setAttribute("type", 'text');
        document.querySelector("#openeye").style.display = 'none';
        document.querySelector("#closedeye").style.display = 'inline-block';
    } else {
        pwdElement.setAttribute("type", 'password')
        document.querySelector("#openeye").style.display = 'inline-block';
        document.querySelector("#closedeye").style.display = 'none';
    }
}


