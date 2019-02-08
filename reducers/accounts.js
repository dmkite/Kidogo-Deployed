import { GET_ACCOUNTS, ADD_MESSAGE, TAKE_TEMP_PIC, UPDATE_ACCOUNTS } from '../actions/accounts'
import { ADD_FEES } from '../actions/payments'

import uuid from 'uuid'
const INITIAL_STATE = {
  accounts:[
    //exmaple account
    {children: [],
    guardians: [],
    emergencyContacts: [],
    rate: 0,
    frequency: 'daily',
    id: uuid(),
    balance: 0
  }],
  message: null //including this because the CameraScreen doesn't have access to props.
}
  //above can definitely change to just an array. don't use message
  
const accounts = (state=INITIAL_STATE, {type, payload}) => {
  switch (type){
    case GET_ACCOUNTS:
      return {...state, accounts: payload}
    case ADD_MESSAGE:
      return {...state, message: payload}
    case TAKE_TEMP_PIC:
      const newState = {...state}
      //need to know which child they are adding, could be multiple
      newState.newAccount.children.img_uri = payload
      return newState
    case UPDATE_ACCOUNTS:
      const newAcctState = {...state}
      newAcctState.accounts = payload
      return newAcctState
    case ADD_FEES:
      const newFeeState = {...state}
      newFeeState.accounts = payload.accounts
      return newFeeState 
    default: 
      return state
  }
}


export default accounts