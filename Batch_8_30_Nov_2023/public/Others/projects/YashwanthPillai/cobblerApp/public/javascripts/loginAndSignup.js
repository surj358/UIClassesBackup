
  const wrapper = $(".ls-wrapper");
  const loginLink = $(".login-link");
  const registerLink = $(".register-link");

  registerLink.on("click", () => {
    wrapper.addClass("active");
  });
  loginLink.on("click", () => {
    wrapper.removeClass("active");
  });



//   $(".tab").addClass("active"); 

  //   $( "button" ).last().on( "click", function() {
//     $( "button" ).first().trigger( "click" );
//     update( $( "span" ).last() );
//   } );
   
