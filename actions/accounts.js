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

export const UPDATE_ACCOUNTS = 'UPDATE_ACCOUNTS'
export function addAccount(account){
  return async dispatch => {
    try{
      account.balance = 0
      let { newAccounts } = await getAsync(false, true)      
      newAccounts.push(account)
      newAccounts = JSON.stringify(newAccounts)
      let signedIn = await SecureStore.getItemAsync('_SIGNEDIN')
      const {user:{id}} = JSON.parse(signedIn)
      await SecureStore.setItemAsync(`_ACCOUNTS_${id}`, newAccounts)
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
      let signedIn = await SecureStore.getItemAsync('_SIGNEDIN')
      const { user: { id } } = JSON.parse(signedIn)
      await SecureStore.setItemAsync(`_ACCOUNTS_${ id }`, JSON.stringify(newAccounts))
      dispatch({
        type: UPDATE_ACCOUNTS, 
        payload: newAccounts
      })
    }catch(err){
      console.error(err)
    }
  }
}

export function changeField(fieldname, newValue, acctId, fieldname2, newValue2){
  return async dispatch => {
    try {
      let { newAccounts } = await getAsync(false, true)
      newAccounts = newAccounts.map((acct, i) => {
        if (acct.id === acctId) {
          acct[fieldname] = newValue
          if(fieldname2 !== undefined){
            acct[fieldname2] = newValue2
          }
        }
        return acct
      })
      let signedIn = await SecureStore.getItemAsync('_SIGNEDIN')
      const { user: { id } } = JSON.parse(signedIn)
      await SecureStore.setItemAsync(`_ACCOUNTS_${id}`, JSON.stringify(newAccounts))
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
      let signedIn = await SecureStore.getItemAsync('_SIGNEDIN')
      const { user: { id } } = JSON.parse(signedIn)
      await SecureStore.setItemAsync(`_ACCOUNTS_${id}`, JSON.stringify(newAccounts))
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
      let signedIn = await SecureStore.getItemAsync('_SIGNEDIN')
      const { user: { id } } = JSON.parse(signedIn)
      await SecureStore.setItemAsync(`_ACCOUNTS_${id}`, JSON.stringify(newAccounts))
      dispatch({
        type: UPDATE_ACCOUNTS,
        payload: newAccounts
      })
    } catch (err) {
      console.error(err)
    }
  }
}

export function deleteAccount(acctId){
  return async dispatch => {
    try {
      let { newAccounts } = await getAsync(false, true)
      newAccounts = newAccounts.filter(acct => acct.id !== acctId)
      let signedIn = await SecureStore.getItemAsync('_SIGNEDIN')
      const { user: { id } } = JSON.parse(signedIn)
      await SecureStore.setItemAsync(`_ACCOUNTS_${id}`, JSON.stringify(newAccounts))
      dispatch({
        type: UPDATE_ACCOUNTS, 
        payload: newAccounts
      })
    } catch (err) {
      console.error(err)
    }
  }
}