  export function register(username, password, onSuccess, onFailure) {
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