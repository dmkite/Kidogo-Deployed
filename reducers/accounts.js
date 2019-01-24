import {ADD_MESSAGE, TAKE_TEMP_PIC} from '../actions/accounts'

const INITIAL_STATE = {
  guardians: [],
  children: [],
  emergencyContacts: [],
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
    emergencyContacts: []
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
      return 
    default: 
      return state
  }
}

export default accounts