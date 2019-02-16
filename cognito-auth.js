/*global WildRydes _config AmazonCognitoIdentity AWSCognito*/

var WildRydes = window.WildRydes || {};

(function scopeWrapper($) {
  var signinUrl = '/signin.html'; //can delete

  var poolData = {
    UserPoolId: _config.cognito.userPoolId,
    ClientId: _config.cognito.userPoolClientId
  };

  var userPool;

///////////////////////////////////////////////////////////////////////////////
//Can Delete///////////////////////////////////////////////////////////////////
  if (!(_config.cognito.userPoolId &&
    _config.cognito.userPoolClientId &&
    _config.cognito.region)) {
    $('#noCognitoMessage').show(); 
    return;
  }
///////////////////////////////////////////////////////////////////////////////

  userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  if (typeof AWSCognito !== 'undefined') {
    AWSCognito.config.region = _config.cognito.region;
  }


  WildRydes.signOut = function signOut() {
    userPool.getCurrentUser().signOut();
  };

  WildRydes.authToken = new Promise(function fetchCurrentAuthToken(resolve, reject) {
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
      cognitoUser.getSession(function sessionCallback(err, session) {
        if (err) {
          reject(err);
        } else if (!session.isValid()) {
          resolve(null);
        } else {
          resolve(session.getIdToken().getJwtToken());
        }
      });
    } else {
      resolve(null);
    }
  });


  /*
   * Cognito User Pool functions
   */

  function register(username, password, onSuccess, onFailure) {
    var dataUsername = {
      Name: 'username',
      Value: username
    };
    var attributeUsername = new AmazonCognitoIdentity.CognitoUserAttribute(dataUsername);

    userPool.signUp(toUsername(username), password, [attributeUsername], null,
      function signUpCallback(err, result) {
        if (!err) {
          onSuccess(result);
        } else {
          onFailure(err);
        }
      }
    );
  }

  function signin(email, password, onSuccess, onFailure) {
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
      Username: toUsername(email),
      Password: password
    });

    var cognitoUser = createCognitoUser(email);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: onSuccess,
      onFailure: onFailure
    });
  }

  function verify(email, code, onSuccess, onFailure) {
    createCognitoUser(email).confirmRegistration(code, true, function confirmCallback(err, result) {
      if (!err) {
        onSuccess(result);
      } else {
        onFailure(err);
      }
    });
  }

  function createCognitoUser(email) {
    return new AmazonCognitoIdentity.CognitoUser({
      Username: toUsername(email),
      Pool: userPool
    });
  }

  function toUsername(email) {
    return email.replace('@', '-at-');
  }

  /*
   *  Event Handlers
   */
///////////////////////////////////////////////////////////////////////////////
//Replace with native function/////////////////////////////////////////////////
  $(function onDocReady() {
    $('#signinForm').submit(handleSignin);
    $('#registrationForm').submit(handleRegister);
    $('#verifyForm').submit(handleVerify);
  });

  function handleSignin(event) {
    var email = $('#emailInputSignin').val();
    var password = $('#passwordInputSignin').val();
    event.preventDefault(); //delete
    signin(email, password,
      function signinSuccess() {
        console.log('Successfully Logged In');
        window.location.href = 'ride.html';  //props.navigattion.navigate('Dash') 
      },
      function signinError(err) {
        alert(err); //Alert.alert(err)
      }
    );
  }

  function handleRegister(event) {
    var email = $('#emailInputRegister').val(); //const username = this.state.username
    var password = $('#passwordInputRegister').val(); //const password = this.state.password
    // var password2 = $('#password2InputRegister').val();

    var onSuccess = function registerSuccess(result) {
      var cognitoUser = result.user;
      console.log('user name is ' + cognitoUser.getUsername());
      var confirmation = ('Registration successful. Please check your email inbox or spam folder for your verification code.');
      if (confirmation) {Email
        window.location.href = 'verify.html'; //props.navigation.navigate('Home')
      }
    };
    var onFailure = function registerFailure(err) {
      alert(err); //Alert.alert(err)
    };
    // event.preventDefault();
    register(email, password, onSuccess, onFailure); //register(username, password, onSuccess, onFailure);
    // if (password === password2) {
    //   register(email, password, onSuccess, onFailure);
    // } else {
    //   alert('Passwords do not match');
    // }
  }

///////////////////////////////////////////////////////////////////////////////
//Do not need verification/////////////////////////////////////////////////////
  function handleVerify(event) {
    var email = $('#emailInputVerify').val();
    var code = $('#codeInputVerify').val();
    event.preventDefault();
    verify(email, code,
      function verifySuccess(result) {
        console.log('call result: ' + result);
        console.log('Successfully verified');
        alert('Verification successful. You will now be redirected to the login page.');
        window.location.href = signinUrl;
      },
      function verifyError(err) {
        alert(err);
      }
    );
  }
///////////////////////////////////////////////////////////////////////////////
}(jQuery));