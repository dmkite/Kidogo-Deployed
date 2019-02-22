import {GET_ATTENDANCE, CHANGE_CHECK_IN_OUT} from '../actions/attendance'

const INITIAL_STATE = {
}

const attendance = (state = INITIAL_STATE, {type, payload}) => {
  let newState
  switch(type){
    case GET_ATTENDANCE:
      return payload
    case CHANGE_CHECK_IN_OUT:
      // newState = {...state}

      return payload
    default: 
      return state
  }
}


export default attendance
