import {AsyncStorage} from 'react-native'

export const ADD_MESSAGE = 'ADD_MESSAGE'
export function addMessage(msg){
  return {
    type: ADD_MESSAGE,
    payload: msg
  }
}

export const TAKE_TEMP_PIC = 'TAKE_TEMP_PIC'
export function takeTempPic(uri){
  return {
    type: TAKE_TEMP_PIC,
    payload: uri
  }
}

export const ADD_ACCOUNT = 'ADD_ACCOUNT'
export function addAccount(account){
  return async dispatch => {
    try{
      let newAccounts
      let accounts = await AsyncStorage.getItem('_ACCOUNTS')
      accounts = JSON.parse(accounts)
      if(!accounts) newAccounts = [account]
      else newAccounts = [...accounts, account]
      newAccounts = JSON.stringify(newAccounts)
      await AsyncStorage.setItem('_ACCOUNTS', newAccounts)
      dispatch({
        type: ADD_ACCOUNT,
        payload: JSON.parse(newAccounts)
      })
    }catch(err){
      //error handling goes here
      console.log(err, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1')
    }

  }

  
}