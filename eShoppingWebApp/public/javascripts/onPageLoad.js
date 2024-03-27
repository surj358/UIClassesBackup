document.addEventListener("DOMContentLoaded", () => {
    // Changes Done By Ashish Chauhan (Password Rememer)
    const checkrem = document.getElementById("rememberMe"),
      emailInput = document.querySelector("#userAccountId"),
      passInput = document.querySelector("#accountPwd");
    if (localStorage.checkbox && localStorage.checkbox !== "") {
      checkrem.setAttribute("checked", "checked");
      emailInput.value = localStorage.username;
      passInput.value = localStorage.userpassword;
    } else {
      checkrem.removeAttribute("checked");
      emailInput.value = "";
      passInput.value = "";
    }
  
    console.log(location);
    console.log(location.search);
    const params = new URLSearchParams(location.search);
    
    if (params.get('pid') ) {
      // load the product details page 
      loadSelectedPage('productDetails');
    }
  
  });
  