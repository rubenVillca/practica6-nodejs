
// JavaScript Document// This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
	if (!response)
	{
		$('#admin').hide();
		$('#form_container').hide();
		$('#catadmin').hide();
	}
	else{
		if (response.status === 'connected') {
		  // Logged into your app and Facebook.
		  getAPIInfo();
		  $('#submit-review').attr('disabled', false);
		  $('#logout').show();
		  $('#logout2').show();
		  $('#adminface').hide();
		  
		 

		
		} else {
		  // The person is not logged into your app or we are unable to tell.
		 /* document.getElementById('status').innerHTML = 'Please log ' +
			'into this app.';*/
			 $('#submit-review').attr('disabled', true);
			 $('#logout').hide();
			  $('#logout2').hide();
			  $('#admin').hide();
			  $('#form_container').hide();
			  $('#catadmin').hide();

		}
	}
  }
  
  function Logout(response) {
	FB.logout(function(response) {
	  $('#submit-review').attr('disabled', true);
	  $('#logout').hide();
	  
	});
  }
  
 

	
  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '695325257340501',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.8' // use graph api version 2.8
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };


  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function getAPIInfo() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me?fields=id,name,picture,email,public_key,third_party_id', function(response) {
      console.log(response.third_party_id + 'Successful login for: ' + response.public_key);
	   $("#facebook_id").val(response.id);
	   $("#facebook_name").val(response.name);
	   $("#facebook_email").val(response.email);
	   if(response.email == "black_alastor_666@hotmail.com")
	   {
		   $('#admin').show();
          $('#form_container').show();
		  $('#catadmin').show();
		  $('#adminface').hide();
	   }
	   var d = new Date();
	   var iso_date_string = d.toISOString(); 
		// produces "2014-12-15T19:42:27.100Z"
	   var locale_date_string = d.toLocaleDateString();
	   $('#date').val(iso_date_string);
	   console.log($('#date').val());
      //document.getElementById('status').innerHTML =
     //   'Thanks for logging in, ' + response.name + '!';
    });
  }