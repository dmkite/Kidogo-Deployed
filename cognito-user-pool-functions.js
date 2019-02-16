import {_config} from './config'
import AmazonCognitoIdentity from 'amazon-cognito-identity-js'

export function register(username, password, onSuccess, onFailure) {
  console.log(username, password)
  const poolData = {
    UserPoolId: _config.cognito.userPoolId,
    ClientId: _config.cognito.userPoolClientId
  };
  console.log(poolData)
  userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  console.log(userPool)
  if (typeof AWSCognito !== 'undefined') {
    AWSCognito.config.region = _config.cognito.region;
  }

  console.log('hitting')
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