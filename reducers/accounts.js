import { GET_ACCOUNTS, ADD_MESSAGE, TAKE_TEMP_PIC, UPDATE_ACCOUNTS } from '../actions/accounts'
import uuid from 'uuid'
const INITIAL_STATE = {
  accounts:[
    //exmaple account
    {children: [
      {
        img_uri: null,
        f_name: 'John',
        l_name: 'Mwangi',
        birthdate: '01-01-2014',
        gender: 'male',
        notes: null,
        id: null
      },
    ],
    guardians: [
      {
        f_name: 'Mary',
        l_name: 'Mwangi',
        phone:'12-345-6789',
        govt_id:'123-45-6789',
        street: '123 First Street',
        city: 'Nairobi',
        id: null
      }
    ],
    emergencyContacts: [
      {
        f_name:'William',
        l_name:'Doe',
        phone: '98-765-4321',
        id: null
      }
    ],
    rate: 120,
    frequency: 'daily',
    id: uuid(),
    balance: 900
  }],
  message: null //including this because the CameraScreen doesn't have access to props.
}

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
    default: 
      return state
  }
}

export default accounts