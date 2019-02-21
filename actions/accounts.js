import {SecureStore} from 'expo'
import getAsync from '../utilities/getAsync'

export const GET_ACCOUNTS = 'GET_ACCOUNTS'
export function getAccounts(){
  try{
    return async dispatch => {
      let {newAccounts} = await getAsync(false, true)
      dispatch({
        type:GET_ACCOUNTS,
        payload: newAccounts
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

export const UPDATE_ACCOUNTS = 'UPDATE_ACCOUNTS'
export function addAccount(account){
  return async dispatch => {
    try{
      account.balance = 0
      let { newAccounts } = await getAsync(false, true)
      
      newAccounts.push(account)
      
      newAccounts = JSON.stringify(newAccounts)
      await SecureStore.setItemAsync('_ACCOUNTS', newAccounts)
      dispatch({
        type: UPDATE_ACCOUNTS,
        payload: JSON.parse(newAccounts)
      })
    }catch(err){
      console.error(err)
    }

  }
}

export function addMemberToAccount(newMember){
  return async dispatch => {
    try{
      let { newAccounts } = await getAsync(false, true)
      newAccounts = newAccounts.map(acct => {
        if(acct.id === newMember.id){
          acct[newMember.type].push(newMember.content)
        }
        return acct
      })
      await SecureStore.setItemAsync('_ACCOUNTS', JSON.stringify(newAccounts))
      dispatch({
        type: UPDATE_ACCOUNTS, 
        payload: newAccounts
      })
    }catch(err){
      console.error(err)
    }
  }
}

export function changeField(fieldname, newValue, id, fieldname2, newValue2){
  
  return async dispatch => {
    try {
      let { newAccounts } = await getAsync(false, true)
      newAccounts = newAccounts.map((acct, i) => {
        if (acct.id === id) {
          acct[fieldname] = newValue
          if(fieldname2 !== undefined){
            acct[fieldname2] = newValue2
          }
        }
        return acct
      })
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

export function deleteMember(acctId, memberType, memberId){
  return async dispatch => {
    try {
      let { newAccounts } = await getAsync(false, true)
      newAccounts = newAccounts.map(acct => {
        if (acct.id === acctId) {
          acct[memberType] = acct[memberType].filter(member => member.id !== memberId)
        }
        return acct
      })
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

export function changeMember(changes, acctId, memberType, memberId){
  return async dispatch => {
    try {
      let { newAccounts } = await getAsync(false, true)
      newAccounts = newAccounts.map(acct => {
        if (acct.id === acctId) {
          acct[memberType] = acct[memberType].map(member => {
            if(member.id === memberId) member = {...member, ...changes}
            return member
          })
        }
        return acct
      })
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

export function deleteAccount(id){
  return async dispatch => {
    try {
      let { newAccounts } = await getAsync(false, true)
      newAccounts = newAccounts.filter(acct => acct.id !== id)
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