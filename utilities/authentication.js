import { Auth } from 'aws-amplify';
import {SecureStore} from 'expo'

export const signIn = async (username, password, success, failure) => {
  return Auth.signIn({ 
    username, 
    password, 
  }).then(async user => {
    const tokenObj = {
      accessToken: user.signInUserSession.accessToken.jwtToken,
      idToken: user.signInUserSession.idToken.jwtToken,
      refreshToken: user.signInUserSession.refreshToken.token,
    }
    await SecureStore.setItemAsync('_TOKEN', JSON.stringify(tokenObj))
    return Promise.all([success(false, 'needSignIn'), success(false, 'loading'), failure('Authorization successful')])
  })
    .catch(err => {
      console.log(err)
      return failure('Sign in unsuccessful')
    });
}

export function signUp(username, password, phone, failure, redirect){
  const phone_number = '+254' + phone.split('-').join('')
  
  Auth.signUp({
    username,
    password,
    attributes: {
      preferred_username: username,
      phone_number
    },
    validationData: []  
  })
    .then(data => console.log(data))
    .catch(err => Promise.all([failure(err.message || 'Something went wrong'), redirect('caregiver')]))
}

export function confirm(username, code, success, failure, changeLoading){
  // After retrieving the confirmation code from the user
  Auth.confirmSignUp(username, code, {
    // Optional. Force user confirmation irrespective of existing alias. By default set to True.
    forceAliasCreation: true
  }).then(() => {
    success()
  })
    .catch(err => {
      return Promise.all([
        failure(err.message || 'Error confirming code.'),
        changeLoading(false, 'loading')
      ])
    });

}
  export function resend(username, failure){
    Auth.resendSignUp(username).then(() => {
      console.log('code resent successfully');
    }).catch(err => {
      failure(err)
    });
  }
  

  //NOTE: Features useful in future, not currently integrated
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