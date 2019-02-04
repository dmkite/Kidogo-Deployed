import {AsyncStorage} from 'react-native'

export const GET_ACCOUNTS = 'GET_ACCOUNTS'
export function getAccounts(){
  try{
    return async dispatch => {
      let accounts = await AsyncStorage.getItem('_ACCOUNTS')
      if(!accounts) accounts = []
      else accounts = JSON.parse(accounts)
      dispatch({
        type:GET_ACCOUNTS,
        payload: accounts
      })
    }
  }catch(err){
    console.error(err)
  }
}

export const GET_ONE_ACCOUNT = 'GET_ONE_ACCOUNT'
export function getOneAccount(id){
  
}

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
      account.balance = 0
      let newAccounts
      let accounts = await AsyncStorage.getItem('_ACCOUNTS')
      if(!accounts) newAccounts = [account]
      else{
        accounts = JSON.parse(accounts)
        newAccounts = [...accounts, account]
      }
      newAccounts = JSON.stringify(newAccounts)
      await AsyncStorage.setItem('_ACCOUNTS', newAccounts)
      dispatch({
        type: ADD_ACCOUNT,
        payload: JSON.parse(newAccounts)
      })
    }catch(err){
      //error handling goes here
      console.error(err, '!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    }

  }
}

// export const ADD_MEMBER_TO_ACCOUNT = 'ADD_MEMBER_TO_ACCOUNT'
export function addMemberToAccount(newMember){
  return async dispatch => {
    try{
      let accounts = await AsyncStorage.getItem('_ACCOUNTS')
      accounts = JSON.parse(accounts)
      let newAccounts = accounts.map(acct => {
        if(acct.id === newMember.id){
          acct[newMember.type].push(newMember.content)
        }
        return acct
      })
      await AsyncStorage.setItem('_ACCOUNTS', JSON.stringify(newAccounts))
      dispatch({
        type: ADD_ACCOUNT, //this would have the exact same functionality as ADD_MEMBER_TO_ACCOUNT
        payload: newAccounts
      })
    }catch(err){
      console.error(err)
    }
  }
}

// export const CHANGE_FIELD = 'CHANGE_FIELD'
export function changeField(fieldname, newValue, id){
  console.log(fieldname, newValue, id)
  return async dispatch => {
    try {
      let accounts = await AsyncStorage.getItem('_ACCOUNTS')
      accounts = JSON.parse(accounts)
      let newAccounts = accounts.map(acct => {
        if (acct.id === id) {
          acct[fieldname] = Number(newValue)
        }
        return acct
      })
      await AsyncStorage.setItem('_ACCOUNTS', JSON.stringify(newAccounts))
      dispatch({
        type: ADD_ACCOUNT, //this would have the exact same functionality as ADD_MEMBER_TO_ACCOUNT
        payload: newAccounts
      })
    } catch (err) {
      console.error(err)
    }
  }
}