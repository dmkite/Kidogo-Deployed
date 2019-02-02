import { ADD_MESSAGE, TAKE_TEMP_PIC, ADD_ACCOUNT } from '../actions/accounts'
import uuid from 'uuid'
const INITIAL_STATE = {
  accounts:[
    //exmaple account
    {children: [
      {
        img_uri: null,
        f_name: 'John',
        l_name: 'Mwangi',
        age: 4,
        gender: 'male',
        notes: null
      },
      {
        img_uri: null,
        f_name: 'Mercy',
        l_name: 'Mwangi',
        age: 6,
        gender: 'female',
        notes: null
      }
    ],
    guardians: [
      {
        f_name: 'Mary',
        l_name: 'Mwangi',
        phone:'12-345-6789',
        govt_id:'123-45-6789',
        address_1: '123 First Street',
        city: 'Nairobi'
      }
    ],
    emergencyContacts: [
      {
        f_name:'William',
        l_name:'Doe',
        phone: '98-765-4321'
      }
    ],
    rate: 120,
    frequency: 'daily',
    id: uuid(),
    balance: 900
  },
    {
      children: [
        {
          img_uri: null,
          f_name: 'Abe',
          l_name: 'Bower',
          age: 6,
          gender: 'male',
          notes: null
        }
      ],
      guardians: [
        {
          f_name: 'Carrie',
          l_name: 'Bower',
          phone: '12-345-6789',
          govt_id: '123-45-6789',
          address_1: '123 First Street',
          city: 'Nairobi'
        }
      ],
      emergencyContacts: [
        {
          f_name: 'Adam',
          l_name: 'Doe',
          phone: '98-765-4321'
        }
      ],
      rate: 920,
      frequency: 'weekly',
      id: uuid(),
      balance: 2500
    }
  ],
  newAccount: {
    children: {
      img_uri: null,
      f_name: null,
      l_name: null,
      age: 0,
      gender: null,
      notes: null
    },
    guardians: [],
    emergencyContacts: [],
    rate: 0,
    frequency: 'daily',
    id: null
  },
  message: null //including this because the CameraScreen doesn't have access to props.
}

const accounts = (state=INITIAL_STATE, {type, payload}) => {
  switch (type){
    case ADD_MESSAGE:
      return {...state, message: payload}
    case TAKE_TEMP_PIC:
      const newState = {...state}
      //need to know which child they are adding, could be multiple
      newState.newAccount.children.img_uri = payload
      return newState
    case ADD_ACCOUNT:
      const newAcctState = {...state}
      newAcctState.accounts = [...newAcctState.accounts, payload]
      return newAcctState
    default: 
      return state
  }
}

export default accounts