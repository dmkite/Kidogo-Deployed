import { GET_ACCOUNTS, ADD_MESSAGE, UPDATE_ACCOUNTS } from '../actions/accounts'
import { ADD_FEES } from '../actions/payments'

import uuid from 'uuid'
const INITIAL_STATE = [
    {
      children: [],
      guardians: [],
      emergencyContacts: [],
      rate: 0,
      frequency: 'daily',
      id: uuid(),
      balance: 0
  }
]
  
const accounts = (state=INITIAL_STATE, {type, payload}) => {
  switch (type){
    case GET_ACCOUNTS:
      console.log(typeof(payload))
      return payload
    case ADD_MESSAGE:
      return payload
    case UPDATE_ACCOUNTS:
      return payload
    case ADD_FEES:
      return payload
    default: 
      return state
  }
}

export default accounts