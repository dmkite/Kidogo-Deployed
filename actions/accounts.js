import {AsyncStorage} from 'react-native'
import {SecureStore} from 'expo'

export const GET_ACCOUNTS = 'GET_ACCOUNTS'
export function getAccounts(){
  try{
    return async dispatch => {
      // let accounts = await AsyncStorage.getItem('_ACCOUNTS')
      let accounts = await SecureStore.getItemAsync('_ACCOUNTS')

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

export const UPDATE_ACCOUNTS = 'UPDATE_ACCOUNTS'
export function addAccount(account){
  return async dispatch => {
    try{
      account.balance = 0
      let newAccounts
      // let accounts = await AsyncStorage.getItem('_ACCOUNTS')
      let accounts = await SecureStore.getItemAsync('_ACCOUNTS')
      if(!accounts) newAccounts = [account]
      else{
        accounts = JSON.parse(accounts)
        newAccounts = [...accounts, account]
      }
      newAccounts = JSON.stringify(newAccounts)
      // await AsyncStorage.setItem('_ACCOUNTS', newAccounts)
      await SecureStore.setItemAsync('_ACCOUNTS', newAccounts)
      dispatch({
        type: UPDATE_ACCOUNTS,
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
      // let accounts = await AsyncStorage.getItem('_ACCOUNTS')
      let accounts = await SecureStore.getItemAsync('_ACCOUNTS')
      accounts = JSON.parse(accounts)
      let newAccounts = accounts.map(acct => {
        if(acct.id === newMember.id){
          acct[newMember.type].push(newMember.content)
        }
        return acct
      })
      // await AsyncStorage.setItem('_ACCOUNTS', JSON.stringify(newAccounts))
      await SecureStore.setItemAsync('_ACCOUNTS', JSON.stringify(newAccounts))
      dispatch({
        type: UPDATE_ACCOUNTS, //this would have the exact same functionality as ADD_MEMBER_TO_ACCOUNT
        payload: newAccounts
      })
    }catch(err){
      console.error(err)
    }
  }
}

// export const CHANGE_FIELD = 'CHANGE_FIELD'
export function changeField(fieldname, newValue, id){
  return async dispatch => {
    try {
      // let accounts = await AsyncStorage.getItem('_ACCOUNTS')
      let accounts = await SecureStore.getItemAsync('_ACCOUNTS')
      accounts = JSON.parse(accounts)
      let newAccounts = accounts.map(acct => {
        if (acct.id === id) {
          acct[fieldname] = newValue
        }
        return acct
      })
      // await AsyncStorage.setItem('_ACCOUNTS', JSON.stringify(newAccounts))
      await SecureStore.setItemAsync('_ACCOUNTS', JSON.stringify(newAccounts))
      dispatch({
        type: UPDATE_ACCOUNTS, //this would have the exact same functionality as ADD_MEMBER_TO_ACCOUNT
        payload: newAccounts
      })
    } catch (err) {
      console.error(err)
    }
  }
}

export function deleteMember(acctId, memberType, memberId){
  return async dispatch => {
    try {
      // let accounts = await AsyncStorage.getItem('_ACCOUNTS')
      let accounts = await SecureStore.getItemAsync('_ACCOUNTS')
      accounts = JSON.parse(accounts)
      let newAccounts = accounts.map(acct => {
        if (acct.id === acctId) {
          acct[memberType] = acct[memberType].filter(member => member.id !== memberId)
        }
        return acct
      })
      // await AsyncStorage.setItem('_ACCOUNTS', JSON.stringify(newAccounts))
      await SecureStore.setItemAsync('_ACCOUNTS', JSON.stringify(newAccounts))
      dispatch({
        type: UPDATE_ACCOUNTS, //this would have the exact same functionality as ADD_MEMBER_TO_ACCOUNT
        payload: newAccounts
      })
    } catch (err) {
      console.error(err)
    }
  }
}

export function changeMember(changes, acctId, memberType, memberId){
  return async dispatch => {
    try {
      // let accounts = await AsyncStorage.getItem('_ACCOUNTS')
      let accounts = await SecureStore.getItemAsync('_ACCOUNTS')
      accounts = JSON.parse(accounts)
      let newAccounts = accounts.map(acct => {
        if (acct.id === acctId) {
          acct[memberType] = acct[memberType].map(member => {
            if(member.id === memberId) member = {...member, ...changes}
            return member
          })
        }
        return acct
      })
      // await AsyncStorage.setItem('_ACCOUNTS', JSON.stringify(newAccounts))
      await SecureStore.setItemAsync('_ACCOUNTS', JSON.stringify(newAccounts))
      dispatch({
        type: UPDATE_ACCOUNTS, //this would have the exact same functionality as ADD_MEMBER_TO_ACCOUNT
        payload: newAccounts
      })
    } catch (err) {
      console.error(err)
    }
  }
}

export function deleteAccount(id){
  return async dispatch => {
    try {
      // let accounts = await AsyncStorage.getItem('_ACCOUNTS')
      let accounts = await SecureStore.getItemAsync('_ACCOUNTS')
      accounts = JSON.parse(accounts)
      let newAccounts = accounts.filter(acct => acct.id !== id)
      // await AsyncStorage.setItem('_ACCOUNTS', JSON.stringify(newAccounts))
      await SecureStore.setItemAsync('_ACCOUNTS', JSON.stringify(newAccounts))
      dispatch({
        type: UPDATE_ACCOUNTS, 
        payload: newAccounts
      })
    } catch (err) {
      console.error(err)
    }
  }
}