import { Auth } from 'aws-amplify';

export const signIn = async (username, password) => {
  try {
    const user = await Auth.signIn(username, password);
    if (user.challengeName === 'SMS_MFA' ||
      user.challengeName === 'SOFTWARE_TOKEN_MFA') {
      // You need to get the code from the UI inputs
      // and then trigger the following function with a button click
      const code = getCodeFromUserInput();
      // If MFA is enabled, sign-in should be confirmed with the confirmation code
      const loggedUser = await Auth.confirmSignIn(
        user,   // Return object from Auth.signIn()
        code,   // Confirmation code  
        mfaType // MFA Type e.g. SMS, TOTP.
      );
    } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
      const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
      // You need to get the new password and required attributes from the UI inputs
      // and then trigger the following function with a button click
      // For example, the email and phone_number are required attributes
      const { username, email, phone_number } = getInfoFromUserInput();
      const loggedUser = await Auth.completeNewPassword(
        user,               // the Cognito User Object
        newPassword,       // the new password
        // OPTIONAL, the required attributes
        {
          email,
          phone_number,
        }
      );
    } else if (user.challengeName === 'MFA_SETUP') {
      // This happens when the MFA method is TOTP
      // The user needs to setup the TOTP before using it
      // More info please check the Enabling MFA part
      Auth.setupTOTP(user);
    } else {
      // The user directly signs in
      console.log(user) 
    }
  } catch (err) {
    if (err.code === 'UserNotConfirmedException') {
      // The error happens if the user didn't finish the confirmation step when signing up
      // In this case you need to resend the code and confirm the user
      // About how to resend the code and confirm the user, please check the signUp part
    } else if (err.code === 'PasswordResetRequiredException') {
      // The error happens when the password is reset in the Cognito console
      // In this case you need to call forgotPassword to reset the password
      // Please check the Forgot Password part.
    } else {
      console.log(err);
    }
  }
  // For advanced usage
  // You can pass an object which has the username, password and validationData which is sent to a PreAuthentication Lambda trigger
  
  Auth.signIn({
    username, // Required, the username
    password, // Optional, the password
    validationData, // Optional, a random key-value pair map which can contain any key and will be passed to your PreAuthentication Lambda trigger as-is. It can be used to implement additional validations around authentication
  }).then(user => console.log(user))
    .catch(err => console.log(err));
}



export function signUp(username, password){
  Auth.signUp({
    username,
    password,
    attributes: {
      preferred_username: username,
      phone_number:'+19802260372'
    },
    validationData: []  //optional
  })
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

export function confirm(username, code, success, failure){
  console.log(success, typeof(success))
  // After retrieving the confirmation code from the user
  Auth.confirmSignUp(username, code, {
    // Optional. Force user confirmation irrespective of existing alias. By default set to True.
    forceAliasCreation: true
  }).then(data => {
    console.log(data)
    console.log(']]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]')
    success()
  })
    .catch(err => {
      console.log(err)
      failure(err.message)
    });

}
  export function resend(username){
    Auth.resendSignUp(username).then(() => {
      console.log('code resent successfully');
    }).catch(e => {
      console.log(e);
    });
  }
  
export function changePassword(oldPassword, newPassword){
  Auth.currentAuthenticatedUser()
    .then(user => {
      return Auth.changePassword(user, oldPassword, newPassword);
    })
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

export function forgotPassword(username){
  Auth.forgotPassword(username)
    .then(data => console.log(data))
    .catch(err => console.log(err));

  // Collect confirmation code and new password, then
  Auth.forgotPasswordSubmit(username, code, new_password)
    .then(data => console.log(data))
    .catch(err => console.log(err));
}